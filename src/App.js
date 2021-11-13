import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";
import TrashNotesList from "./components/TrashNotesList";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [trashNotes, setTrashNotes] = useState([]);
  const [showTrashNotes, setshowTrashNotes] = useState(false);

  const [searchText, setSearchText] = useState("");

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));
    const savedTrashNotes = JSON.parse(
      localStorage.getItem("react-notes-app-trash-data")
    );

    if (savedNotes) {
      setNotes(savedNotes);
    }
    if (savedTrashNotes) {
      setTrashNotes(savedTrashNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
    localStorage.setItem(
      "react-notes-app-trash-data",
      JSON.stringify(trashNotes)
    );
  }, [notes]);

  const addNote = (text) => {
    const newNote = {
      id: nanoid(),
      text: text,
      date: new Date().toLocaleDateString(),
    };
    notes.push(newNote);
    setNotes(notes);
  };

  const handleEditNote = (id, newText) => {
    let oldNote = notes.filter((n) => n.id !== id);
    oldNote = { newText };
    const newNotes = [...notes, oldNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);

    const trashNote = notes.filter((note) => note.id === id);
    const newTrashNotes = [...trashNotes];
    newTrashNotes.push(trashNote);
    setTrashNotes(newTrashNotes);
  };

  const restoreNote = (id) => {
    const toBeRestoredNote = trashNotes.filter((note) => note.id === id)[0];
    const newNotes = [...notes, toBeRestoredNote];
    setNotes(newNotes);

    const newTrash = trashNotes.filter((note) => note.id !== id);
    setTrashNotes(newTrash);
  };

  const restoreAll = () => {
    const oldNotes = [...notes];
    oldNotes.map((note) => trashNotes.push(note));
    setNotes(oldNotes);
  };

  const handleDarkMode = () => {
    darkMode ? setDarkMode(false) : setDarkMode(true)


  }

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={handleDarkMode} />
        <button onClick={() => setshowTrashNotes(!showTrashNotes)}>
          {showTrashNotes ? "Show Notes" : "Show Trash Can"}
        </button>
        {showTrashNotes && <button onClick={restoreAll}>Restore All</button>}
        {showTrashNotes && (
          <button onClick={() => setTrashNotes([])}>Empty Trash Can</button>
        )}
        <Search handleSearchNote={setSearchText} />
        {!showTrashNotes && (
          <NotesList
            notes={notes}
            handleAddNote={addNote}
            handleDeleteNote={deleteNote}
            handleEditNote={handleEditNote}
          />
        )}
        {showTrashNotes && (
          <TrashNotesList
            notes={trashNotes}
            restoreNote={restoreNote}
          />
        )}
      </div>
    </div>
  );
};

export default App;
