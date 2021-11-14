import Note from "./Note";
import AddNote from "./AddNote";

const NotesList = ({
  notes,
  handleAddNote,
  handleDeleteNote,
  handleEditNote,
  // BUG12: Start
  // searchText,
  // BUG12: End
}) => {
  return (
    <div className="notes-list">
      {notes.map((note) => (
        <Note
          id={note.id}
          text={note.text}
          date={note.date}
          handleDeleteNote={handleDeleteNote}
          handleEditNote={handleEditNote}
        />
      ))}
      {/* BUG12: Start - Don't show add note section while searching */}
      <AddNote handleAddNote={handleAddNote} />
      {/* {!searchText && <AddNote handleAddNote={handleAddNote} />} */}
      {/* BUG12: End */}
    </div>
  );
};

export default NotesList;
