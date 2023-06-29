import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
    // setting host if you host this website then only you have change this host means provide ip address of that
    const host = "http://localhost:4500/";

    // setting default notes i.e. blank
    let notesInitital = [];
    const [notes, setNotes] = useState(notesInitital);

    // getting all notes of the logged in user
    const getNotes = async () => {
        // sending api call for fetch all notes related to logged in user
        const response = await fetch(`${host}api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": sessionStorage.getItem("auth-token")
            }
        });
        // setting response in json format
        const json = await response.json();
        // updating the notes state
        setNotes(json);
    }

    // adding a new note
    const AddNewNote = async (newNote) => {
        // making body for inserting or adding new note
        const body = {
            title: `${newNote.title}`,
            description: `${newNote.description}`
        };
        // sending save note api call for that note
        const response = await fetch(`${host}api/notes/savenotes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": sessionStorage.getItem("auth-token")
            },
            body: JSON.stringify(body)
        });
        // converting response into a json
        const json = await response.json();
        // updating the state
        setNotes(notes.concat(json));
    }

    // deleting a note
    const DeleteNote = async (noteId) => {
        // sending delete api call for that note
        const response = await fetch(`${host}api/notes/deletenotes/${noteId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": sessionStorage.getItem("auth-token")
            }
        });
        // returning a note if noteId is not equal note._id present in notes string 
        let updatedNote = notes.filter((note) => { return note._id !== noteId });
        // updating notes string
        setNotes(updatedNote);
    }

    // editing a note
    const EditNote = async (n) => {
        // making body for inserting or adding new note
        const body = {
            title: `${n.title}`,
            description: `${n.description}`
        };
        // sending edit api call for that note
        const response = await fetch(`${host}api/notes/updatenotes/${n.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": sessionStorage.getItem("auth-token")
            },
            body: JSON.stringify(body)
        });
        let newNote = JSON.parse(JSON.stringify(notes));
        // updating note on front end
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if (element._id === n.id) {
                // match found
                newNote[index].title = n.title;
                newNote[index].description = n.description;
                break;
            }
        }
        setNotes(newNote);
    }

    // returning note context
    return (
        <NoteContext.Provider value={{ notes, setNotes, AddNewNote, DeleteNote, EditNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;