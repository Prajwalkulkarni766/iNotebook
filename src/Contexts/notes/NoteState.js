import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    // setting some default notes
    let notesInitital = [
        {
            "_id": "649a93d774fee1cfe245cb6e",
            "user": "6498558958d7561d1e5368f0",
            "title": "First Note",
            "description": "This is description of first note",
            "date": "2023-06-27T07:46:31.704Z",
            "__v": 0
        },
        {
            "_id": "649ac6a23820701e7a372000",
            "user": "6498558958d7561d1e5368f0",
            "title": "Second Note",
            "description": "This is description of first note",
            "date": "2023-06-27T11:23:14.325Z",
            "__v": 0
        }
    ];
    // setting state for notes
    const [notes, setNotes] = useState(notesInitital);

    // adding a new note
    const AddNewNote = (newNote) => {
        // console.log('adding a note');
        let n = {
            "_id": "649ac6a23820701e7a55664372000",
            "user": "6498558958d7561d1e5368f0",
            "title": newNote.title,
            "description": newNote.description,
            "date": "2023-06-27T11:23:14.325Z",
            "__v": 0
        };
        // updating the state
        setNotes(notes.concat(n));
    }

    // deleting a note
    const DeleteNote = (noteId) => {
        // returning a note if noteId is not equal note._id present in notes string 
        let updatedNote = notes.filter((note) => { return note._id !== noteId });
        // updating notes string
        setNotes(updatedNote);
    }

    // editing a note
    const EditNote = (n) => {
        // getting selected note
        // let editedNote = notes.filter((note) => {
        //     if (note._id === n.id) {
        //         note.title = n.title;
        //         note.description = n.description;
        //     }
        // });
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === n.id) {
                console.log("match found");
                element.title = n.title;
                element.description = n.description;
            }
        }
        // setNotes(editedNote);
    }

    // returning note context
    return (
        <NoteContext.Provider value={{ notes, setNotes, AddNewNote, DeleteNote, EditNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;