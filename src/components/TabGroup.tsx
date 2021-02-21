import {
  AppBar,
  Box,
  createStyles,
  makeStyles,
  Tab,
  Tabs,
  Theme,
} from "@material-ui/core";
import { useState } from "react";
import { Place, PlaceCallback, PlaceList } from "../store/types";
import { fetchGeocode } from "../utils/functions";
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
  const { bookmarks } = props;
  const [tab, setTab] = useState(0);

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
                (p) =>
                  props.onSelect({
                    ...p,
                    structured_formatting: place.structured_formatting,
                  })
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
