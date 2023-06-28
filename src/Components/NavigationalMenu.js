import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function NavigationalMenu() {
  const [show, setShow] = useState(false);

  const toggleOffCanvas = () => {
    setShow((show) => !show);
  };

  let location = useLocation();

  useEffect(() => {
    // console.log(location.pathname);
  }, [location]);

  return (
    <>
      <Navbar expand={false} className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand placement="" style={{ cursor: "pointer" }}>iNoteBook</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`}
            onClick={toggleOffCanvas} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand`}
            aria-labelledby={`offcanvasNavbarLabel-expand`}
            placement="end"
            show={show}
            onHide={toggleOffCanvas}
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand`} style={{ cursor: "pointer" }}>
                iNoteBook
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                <Link className={`nav-link ${location.pathname === '/' ? 'text-secondary-emphasis' : 'text-secondary'} `} to={"/"} onClick={toggleOffCanvas}>Home</Link>
                <Link className={`nav-link ${location.pathname === '/about' ? 'text-secondary-emphasis' : 'text-secondary'} `} to={"/about"} onClick={toggleOffCanvas}>About</Link>
              </Nav>
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className="position-absolute pe-3 bottom-0">
                  Signed in as: <strong>Mark Otto</strong>
                </Navbar.Text>
              </Navbar.Collapse>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}