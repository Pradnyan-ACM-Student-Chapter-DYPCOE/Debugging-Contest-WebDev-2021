import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import NotesList from "./components/NotesList";
import Search from "./components/Search";
import Header from "./components/Header";
import TrashNotesList from "./components/TrashNotesList";
// import EditNote from './components/EditNote';

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
    //BUG2: Start - Not able to add a new Note
    setNotes((prevNotes) => [...prevNotes, newNote]);
    // notes.push(newNote);
    //BUG2: End
  };

  const handleEditNote = (id, newText) => {
    //BUG3: Start - If we edit a particular note, it doesn't updates, but it creates a new empty note.
    const oldNote = notes.filter((n) => n.id === id)[0];
    oldNote.text = newText;
    oldNote.date = new Date().toLocaleDateString();

    //BUG11: Start - Date not gets updating while edit (Nothing to remove)
    // oldNote.date = new Date();
    //BUG11: End

    const newNotes = notes.map((n) => {
      if (n.id === id) {
        return oldNote;
      } else {
        return n;
      }
    });
    setNotes(newNotes);
    // const oldNote = notes.filter((n) => n.id !== id);
    // oldNote = { newText };
    // const newNotes = [...notes, oldNote];
    // setNotes(newNotes);
    //BUG3: End
  };

  const deleteNote = (id) => {
    //BUG4: Start - If we delete a particular note, it gets added to the trash can, but not gets deleted from the notes. In case, it deletes all the rest notes also from the trash can.
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);

    const trashNote = notes.filter((note) => note.id === id)[0];
    const newTrashNotes = [...trashNotes, trashNote];
    setTrashNotes(newTrashNotes);

    // const newNotes = notes.filter((note) => note.id === id);
    // setNotes(newNotes);
    // const trashNote = notes.filter((note) => note.id === id)[0];
    // const newTrashNotes = [...trashNotes];
    // newTrashNotes.push(trashNote);
    // setTrashNotes(newTrashNotes);
    //BUG4: End
  };

  const restoreNote = (id) => {
    const toBeRestoredNote = trashNotes.filter((note) => note.id === id)[0];
    const newNotes = [...notes, toBeRestoredNote];
    console.log(newNotes);
    setNotes(newNotes);

    const newTrash = trashNotes.filter((note) => note.id !== id);
    console.log(newTrash);
    setTrashNotes(newTrash);
  };

  const restoreAll = () => {
    //BUG10: Start - Restore All is not restoring the data, but adding the notes to restore extra
    const oldNotes = [...notes];
    trashNotes.map((note) => oldNotes.push(note));
    setNotes(oldNotes);
    setTrashNotes([]);
    // const oldNotes = [...notes];
    // oldNotes.map((note) => trashNotes.push(note));
    // setNotes(oldNotes);
    //BUG10: End
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode} />
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
            //BUG5: Start - Search bar is not working for notes
            // notes={notes}
            notes={notes.filter((note) => {
              console.log(note);
              return note.text
                .toLowerCase()
                .includes(searchText.toLocaleLowerCase());
            })}
            //BUG5: End
            handleAddNote={addNote}
            handleDeleteNote={deleteNote}
            handleEditNote={handleEditNote}
            // BUG12: Start
            // searchText={searchText}
            // BUG12: End
          />
        )}
        {showTrashNotes && (
          <TrashNotesList
            notes={trashNotes.filter((note) =>
              note.text.toLowerCase().includes(searchText.toLocaleLowerCase())
            )}
            restoreNote={restoreNote}
            // handleAddNote={addNote}
            // handleDeleteNote={deleteNote}
            // handleEditNote={handleEditNote}
          />
        )}
        {/* <EditNote /> */}
      </div>
    </div>
  );
};

export default App;
