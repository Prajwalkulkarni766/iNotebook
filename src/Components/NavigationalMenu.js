import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

export default function NavigationalMenu() {
  // used to redirect to another component
  let navigate = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("auth-token");
    // redirecting to login component
    navigate("/");
  }
  return (
    <Navbar expand={false} className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand placement="" style={{ cursor: "pointer" }}>iNoteBook</Navbar.Brand>
        {sessionStorage.getItem("auth-token") ? <h4><i onClick={logout} className="fa-solid fa-arrow-right-from-bracket justify-content-end" style={{ color: "#050505" }}></i>
        </h4> : ""}
      </Container >
    </Navbar >
  );
}