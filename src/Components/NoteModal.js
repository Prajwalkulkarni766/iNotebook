import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

export default function NoteModal(props) {
    // taking note function as a props and destructuring it this noteFunction may be AddNewNote function or EditNote function 
    // modaltitle means title of modal whether it can be add new note or edit note
    // value for title means title if note is new then it is blank otherwise it dispaly the title of selected note
    // value for description means description if note is new then it is blank otherwise it dispaly the description of selected note
    const { iconType, noteId, noteFunction, modalTitle, valueForTitle, valueForDescription, showAlert } = props;
    // state of showing modal of new note
    const [show, setShow] = useState(false);
    // stae of note if user inputed title and description of new note
    const [note, setNote] = useState({ id: noteId, title: valueForTitle, description: valueForDescription });
    // function to close new note modal
    const handleClose = () => setShow(false);
    // function to open new note modal
    const handleShow = () => setShow(true);
    // function of saving new note
    const handelNewNoteOnSubmit = (e) => {
        e.preventDefault();
        // new note
        noteFunction(note);
        if (modalTitle === "Add New") {
            setNote({ ...note, title: "", description: "" });
        }
        handleClose();
        if (modalTitle === "Add New") {
            showAlert("success", "Note added successfully");
        }
        else{
            showAlert("success", "Note updated successfully");
        }
    }
    // function to clear note state value when user click on close button of new note modal
    const handelNewNoteOnClose = () => {
        if (modalTitle === "Add New") {
            setNote({ ...note, title: "", description: "" });
        }
        else {
            setNote({ ...note, title: valueForTitle, description: valueForDescription });
        }
        handleClose();
    }
    // function to handel change in state of note 
    const handleOnchange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (
        <>
            <i className={`fa-solid ${iconType}`} onClick={handleShow}></i>
            <Modal show={show} onHide={handelNewNoteOnClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{modalTitle} Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="NewNoteTitle" >
                            <Form.Label>Note Title</Form.Label>
                            <Form.Control
                                name="title"
                                type="test"
                                placeholder="Heading of the Note"
                                value={note.title}
                                onChange={handleOnchange}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="NewNoteDescription" >
                            <Form.Label>Note Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="description"
                                placeholder="Description of the Note"
                                rows={5}
                                value={note.description}
                                onChange={handleOnchange}
                                style={{ resize: "none" }}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handelNewNoteOnClose}>Close</Button>
                    <Button disabled={note.title.length < 1 || note.description.length < 1} variant="success" onClick={handelNewNoteOnSubmit}>Save Note</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}