import {
  AppBar,
  Box,
  createStyles,
  makeStyles,
  Tab,
  Tabs,
  Theme,
} from "@material-ui/core";
import { useEffect, useMemo, useState } from "react";
import {
  GeocoderRequest,
  GeocoderResult,
  Place,
  PlaceCallback,
  PlaceList,
} from "../store/types";
import BookmarksList from "./BookmarksList";
import SearchInput from "./SearchInput";
import TabPanel from "./TabPanel";

interface TabGroupOptions {
  bookmarks: PlaceList;
  onSelect: PlaceCallback;
  onDelete: PlaceCallback;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 550,
      textAlign: "center",
    },
  })
);

const TabGroup = (props: TabGroupOptions) => {
  const classes = useStyles();
  const geocoder = { current: null };
  const { bookmarks } = props;
  const [tab, setTab] = useState(0);

  const fetchGeocode = useMemo(
    () => (request: GeocoderRequest, callback: (place: Place) => void) =>
      (geocoder.current as any).geocode(
        request,
        (results?: GeocoderResult[]) => {
          if (results) {
            /** Translate first result from GeocoderResult to PlaceType */
            const result = results[0];
            const location = result.geometry.location;
            const response = {
              place_id: result.place_id,
              description: result.formatted_address,
              structured_formatting: {
                main_text: result.formatted_address.split(",").splice(-1, 1)[0],
                secondary_text: result.formatted_address
                  .split(",")
                  .slice(0, -1)
                  .join(","),
              },
              location: {
                lat: location.lat(),
                lng: location.lng(),
              },
            };

            callback(response);
          }
        }
      ),
    []
  );

  useEffect(() => {
    if (!geocoder.current) {
      geocoder.current = new (window as any).google.maps.Geocoder();
    }

    /**
     * Ask user for position, if permission is given, request additional
     * data from Google API and returns PlaceType to fetch forecast
     */
    navigator.geolocation.getCurrentPosition(
      ({ coords }: { coords: GeolocationCoordinates }) => {
        fetchGeocode(
          {
            location: {
              lat: coords.latitude,
              lng: coords.longitude,
            },
          },
          props.onSelect
        );
      },
      (err) => console.warn(err)
    );
  }, []);

  const handleChange = (event: any, newValue: number) => setTab(newValue);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          indicatorColor="primary"
          variant="fullWidth"
          value={tab}
          onChange={handleChange}
        >
          <Tab value={0} wrapped label="Search" />
          <Tab value={1} wrapped label="Bookmarks" />
        </Tabs>
      </AppBar>
      <Box>
        <TabPanel index={0} value={tab}>
          <SearchInput
            onSelect={(place: Place) => {
              /**
               * Verify existence of place on bookmarks
               * to prevent additional API requests
               */
              const marked = bookmarks.find(
                (p) => p.place_id === place.place_id
              );

              if (!!marked) {
                props.onSelect(marked);
                return;
              }

              fetchGeocode(
                {
                  placeId: place.place_id,
                },
                (p) => {
                  props.onSelect({
                    ...p,
                    structured_formatting: place.structured_formatting,
                  });
                }
              );
            }}
          />
        </TabPanel>
        <TabPanel index={1} value={tab}>
          <BookmarksList
            bookmarks={bookmarks}
            onSelect={props.onSelect}
            onDelete={props.onDelete}
          />
        </TabPanel>
      </Box>
    </div>
  );
};

export default TabGroup;
