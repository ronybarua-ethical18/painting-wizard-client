import React, { useContext } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import MenuBar from '../Home/Header/MenuBar/MenuBar';
import { Button, Form } from 'react-bootstrap';
import banner from '../../images/banners.jpg';
import { useHistory, useLocation } from 'react-router';
import './Login.css';
const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // firebase initialization
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleResponse = (res, redirect) => {
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }

    const isValidLoggedIn = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
            sessionStorage.setItem('token', idToken);
        }).catch(function (error) {
            // Handle error
        });
    }

    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var user = result.user;
                handleResponse(user, true);
                isValidLoggedIn();
                setLoggedInUser(user)
            }).catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                console.log(errorCode, errorMessage, email);
            });
    }
    return (
        <div className="container-fluid" id="loginPage">
            <MenuBar></MenuBar>
            <div className="row">
                <div className="col-md-6 d-flex align-items-center p-4 justify-content-center">
                    <Form className="w-100">
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                        <Button onClick={handleGoogleSignIn}>Login with Google</Button>
                    </Form>
                </div>
                <div className="col-md-6">
                    <img src={banner} id="loginImg" className="img-fluid" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Login;