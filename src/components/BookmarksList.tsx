import {
  Box,
  createStyles,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import { PlaceCallback, PlaceList } from "../store/types";

interface BookmarksListOptions {
  bookmarks: PlaceList;
  onSelect: PlaceCallback;
  onDelete: PlaceCallback;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxHeight: "30vh",
      overflow: "auto",
    },
    title: {
      margin: 20,
    },
  })
);

const BookmarksList = (props: BookmarksListOptions) => {
  const classes = useStyles();
  const { bookmarks } = props;

  return (
    <Box className={classes.root}>
      {bookmarks.length === 0 ? (
        <Typography className={classes.title}>
          Favorite a place to it add to bookmark's list
        </Typography>
      ) : (
        <Box>
          <List>
            {bookmarks.map((place) => (
              <ListItem
                key={place.place_id}
                divider
                button
                onClick={() => props.onSelect(place)}
              >
                <ListItemText primary={place.description} />
                <ListItemSecondaryAction>
                  <IconButton
                    onClick={() => props.onDelete(place)}
                    color="secondary"
                  >
                    <Icon>delete</Icon>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default BookmarksList;
