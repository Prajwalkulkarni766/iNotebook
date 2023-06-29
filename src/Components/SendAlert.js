import React from 'react';
import Alert from 'react-bootstrap/Alert';

export default function SendAlert(props) {
    return (
        props.alert && <Alert variant={props.alert.alertVariant}>
            {props.alert.alertDescription}
        </Alert>
    );
}