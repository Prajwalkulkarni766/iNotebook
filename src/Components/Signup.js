import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export default function Signup(props) {
    // used to redirect to another component
    let navigate = useNavigate();
    const nameInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();

    const signup = async () => {
        // sending login credentials to the api
        const body = {
            name: `${nameInput.current.value}`,
            email: `${emailInput.current.value}`,
            password: `${passwordInput.current.value}`
        };
        const response = await fetch(`http://localhost:4500/api/authentication/createuser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
        const json = await response.json();
        if (json.req_status) {
            props.showAlert("success", "Successfully signup");
            sessionStorage.setItem("auth-token", json.authenticationToken);
            // redirecting to home component
            navigate("/home");
        }
        else {
            props.showAlert("danger", "Failed to signup. Please try agian later");
        }
    }
    return (
        <Container>
            <Row className="justify-content-center">
                <Col lg={6}>
                    <div className="login-container">
                        <h2 className="text-center mb-4">SignUp</h2>
                        <Form>
                            <Form.Group>
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" ref={nameInput} placeholder="Enter name" />
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control type="text" ref={emailInput} placeholder="Enter email address" />
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordInput} placeholder="Enter password" />
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label>Renter Password</Form.Label>
                                <Form.Control type="password" placeholder="Renter password" />
                            </Form.Group>
                            <Button className="mt-3" onClick={signup} variant="primary">Signup</Button>
                            <Form.Group className="mt-3">
                                <Link to={"/"}>Have an account ? Login Now !</Link>
                            </Form.Group>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}