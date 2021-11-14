import { useState } from "react";

const AddNote = ({ handleAddNote }) => {
  const [noteText, setNoteText] = useState("");
  const characterLimit = 200;

  const handleChange = (event) => {
    //BUG7: Start - On adding a new note, the count is showing NaN. And also if I try to write characters more than 200, it is able to write rather than not exceeding it from 200.
    if (characterLimit - event.target.value.length >= 0) {
      setNoteText(event.target.value);
    }
    // setNoteText(event.target.value);
    //BUG7: End
  };

  const handleSaveClick = () => {
    //BUG8: Start - You cannot add empty notes and also, after adding a note, the previous note data is not removed.
    if (noteText.trim().length > 0) {
      handleAddNote(noteText);
      setNoteText("");
    }
    // handleAddNote(noteText);
    //BUG8: End
  };

  return (
    <div className="note new">
      <textarea
        rows="8"
        cols="10"
        placeholder="Type to add a note..."
        value={noteText}
        onChange={handleChange}
      ></textarea>
      <div className="note-footer" style={{ flexDirection: "row" }}>
        {/* BUG7: Start  */}
        <small>{characterLimit - noteText.length} Remaining</small>
        {/* <small>{characterLimit - noteText} Remaining</small> */}
        {/* BUG7: End */}
        <button className="save" onClick={handleSaveClick}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddNote;
