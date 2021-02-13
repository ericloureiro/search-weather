import {
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Place, PlaceCallback, PlaceList } from "../store/types";

interface BookmarksListOptions {
  bookmarks: PlaceList;
  onSelect: PlaceCallback;
  onDelete: PlaceCallback;
}

const BookmarksList = (props: BookmarksListOptions) => {
  const { bookmarks } = props;

  return (
    <div
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
        <List>
          {bookmarks.map((place: Place, index: number) => (
            <ListItem button key={index} onClick={() => props.onSelect(place)}>
              <ListItemText
                style={{
                  overflow: "auto",
                  textOverflow: "ellipsis",
                }}
                primary={place.description}
              />
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
      )}
    </div>
  );
};

export default BookmarksList;
