import {
  createStyles,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import { Autocomplete } from "@material-ui/lab";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import { useEffect, useMemo, useState } from "react";
import { Place, PlaceCallback } from "../store/types";

interface SearchInputOptions {
  onSelect: PlaceCallback;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: 20,
      width: "30vw",
      minWidth: 250,
    },
    icon: {
      margin: 5,
      padding: 5,
    },
  })
);

const SearchInput = (props: SearchInputOptions) => {
  const classes = useStyles();
  const autocomplete = { current: null };
  const [value, setValue] = useState<Place | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<Place[]>([]);

  const fetchPlaces = useMemo(
    () =>
      throttle(
        (request: { input: string }, callback: (results?: Place[]) => void) =>
          (autocomplete.current as any).getPlacePredictions(request, callback),
        200
      ),
    []
  );

  useEffect(() => {
    if (!autocomplete.current && (window as any).google) {
      autocomplete.current = new (window as any).google.maps.places.AutocompleteService();
    }

    if (!autocomplete.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value !== null ? [value] : []);

      return undefined;
    }

    fetchPlaces({ input: inputValue }, (results?: Place[]) => {
      let newOptions = value !== null ? [value] : [];

      if (results) {
        newOptions = [...newOptions, ...results];
      }

      setOptions(newOptions);
    });
  }, [value, inputValue, fetchPlaces]);

  return (
    <Autocomplete
      className={classes.root}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      onChange={(event: any, newValue: Place | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);

        if (!newValue) return;

        props.onSelect(newValue);
      }}
      onInputChange={(_, newInputValue: string) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          autoFocus
          label="Searh a location"
          variant="outlined"
        />
      )}
      renderOption={(option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;

        if (matches !== undefined) {
          const parts = parse(
            option.structured_formatting.main_text,
            matches.map((match: any) => [
              match.offset,
              match.offset + match.length,
            ])
          );

          return (
            <Grid container alignItems="center">
              <Grid item>
                <LocationOnIcon className={classes.icon} />
              </Grid>
              <Grid item xs>
                {parts.map((part: any, index: number) => (
                  <span
                    key={index}
                    style={{ fontWeight: part.highlight ? 700 : 400 }}
                  >
                    {part.text}
                  </span>
                ))}
                <Typography variant="body2" color="textSecondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          );
        }
      }}
    />
  );
};

export default SearchInput;
