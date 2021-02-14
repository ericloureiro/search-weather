import {
  Box,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { PlaceCallback, PlaceList } from "../store/types";

interface BookmarksListOptions {
  bookmarks: PlaceList;
  onSelect: PlaceCallback;
  onDelete: PlaceCallback;
}

const BookmarksList = (props: BookmarksListOptions) => {
  const { bookmarks } = props;

  return (
    <Box
      width={"auto"}
      style={{
        maxHeight: 220,
        overflow: "auto",
      }}
    >
      {bookmarks.length === 0 ? (
        <Typography style={{ margin: 20 }}>
          Favorite a place to it add to bookmark's list
        </Typography>
      ) : (
        <Box flexGrow={1}>
          <List
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {bookmarks.map((place, index) => (
              <ListItem
                style={{ width: "100%" }}
                key={index}
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
