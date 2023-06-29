import React, { useRef } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

export default function Login(props) {
    // used to redirect to another component
    let navigate = useNavigate();
    // setting useRef hook to email and password so that we can access the entered text in the both the input box
    // we can also do this by using useState hook
    const emailInput = useRef(null);
    const passwordInput = useRef(null);

    const login = async () => {
        // sending login credentials to the api
        const body = {
            email: `${emailInput.current.value}`,
            password: `${passwordInput.current.value}`
        };
        const response = await fetch(`http://localhost:4500/api/authentication/loginuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const json = await response.json();
        if (json.req_status) {
            props.showAlert("success", "Successfully to logged in");
            sessionStorage.setItem("auth-token", json.authenticationToken);
            // redirecting to home component
            navigate("/home");
        }
        else {
            props.showAlert("danger", "Failed to login. Please login with correct credentials");
        }
    }
    return (
        <Container>
            <Row className="justify-content-center">
                <Col lg={6}>
                    <div className="login-container">
                        <h2 className="text-center mb-4">Login</h2>
                        <Form>
                            <Form.Group>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="text" ref={emailInput} placeholder="Enter email address" />
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordInput} placeholder="Enter password" />
                            </Form.Group>
                            <Button className="mt-3" onClick={login} variant="primary">Login</Button>
                            <Form.Group className="mt-3">
                                <Link to={"/signup"}>Don't have account ? Signup Now !</Link>
                            </Form.Group>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}