import React from "react";
import PropTypes from "prop-types";

import { ListItem, List, Notes } from "spectacle";

export default function NoteList({ notes }) {
  const listItems = notes.map(note => (
    <ListItem key={note} textSize="2rem">
      {note}
    </ListItem>
  ));

  return (
    <Notes>
      <List>{listItems}</List>
    </Notes>
  );
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.string)
};
