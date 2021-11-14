import { useState } from "react";
import DeleteIcon from "../assets/delete.png";
import EditIcon from "../assets/edit.png";
import CancelIcon from "../assets/cancel.png";

const Note = ({ id, text, date, handleDeleteNote, handleEditNote }) => {
  const [editMode, setEditMode] = useState(false);
  const [noteText, setNoteText] = useState("");
  const characterLimit = 200;

  const handleChange = (event) => {
    //BUG7: Start
    if (characterLimit - event.target.value.length >= 0) {
      setNoteText(event.target.value);
    }
    // setNoteText(event.target.value);
    //BUG7: End
  };

  function longDateStr(Str) {
    var date = new Date(Str);
    date = date.toDateString();
    date =
      date.substring(0, 4) +
      "," +
      date.substring(4, 7) +
      " " +
      date.substring(8);
    return date;
  }

  return (
    <div className="note">
      {!editMode && <span>{text}</span>}
      {editMode && (
        <textarea
          rows="6"
          cols="10"
          value={noteText}
          onChange={handleChange}
        ></textarea>
      )}
      <div className="note-footer">
        <div className="editFoot">
          {/* BUG7: Start */}
          {editMode && (
            <small>{characterLimit - noteText.length} Remaining</small>
          )}
          {/* {editMode && <small>{characterLimit - noteText} Remaining</small>} */}
          {/* BUG7: End */}
          {editMode && (
            <button
              className="editBtn"
              onClick={() => {
                //BUG9: Start - It allows empty text to be added.
                if (!noteText) {
                  return;
                }
                //BUG9: End - Nothing to add.. Just remove the above code

                //BUG3: Start
                handleEditNote(id, noteText);
                // handleEditNote(noteText, id);
                //BUG3: End
                setEditMode(false);
              }}
              style={{
                zIndex: 2,
                height: 25,
                width: 50,
              }}
            >
              <span className="text">Edit</span>
            </button>
          )}
        </div>
        <div className="editFoot2">
          <small className="date">{longDateStr(date)}</small>
          <img src={DeleteIcon} onClick={() => handleDeleteNote(id)} />
          {editMode ? (
            <img
              src={CancelIcon}
              onClick={() => {
                //BUG8: Start - While editing a note, if i don't want to edit it, then it just clears the text rather than closing the edit text area.
                setEditMode(false);
                // setNoteText("");
                //BUG8: End
              }}
            />
          ) : (
            <img
              src={EditIcon}
              onClick={() => {
                setEditMode(true);
                setNoteText(text);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Note;
