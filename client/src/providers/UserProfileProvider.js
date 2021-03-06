import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "reactstrap";
import * as firebase from "firebase/app";
import "firebase/auth";

export const UserProfileContext = createContext();

export function UserProfileProvider(props) {
    const apiUrl = "/api/userprofile";

    const userProfile = sessionStorage.getItem("userProfile");
    const userTypeId = sessionStorage.getItem("userTypeId")

    const [isLoggedIn, setIsLoggedIn] = useState(userProfile != null);

    const [isAdmin, setIsAdmin] = useState(userTypeId === "1");

    const [userProfiles, setUserProfiles] = useState([]);

    const [isFirebaseReady, setIsFirebaseReady] = useState(false);

    useEffect(() => {
        firebase.auth().onAuthStateChanged((u) => {
            setIsFirebaseReady(true);
        });
    }, []);

    const login = (email, pw) => {
        return firebase.auth().signInWithEmailAndPassword(email, pw)
            .then((signInResponse) => getUserProfile(signInResponse.user.uid))
            .then((userProfile) => {
                sessionStorage.setItem("userProfile", JSON.stringify(userProfile));
                sessionStorage.setItem("userTypeId", JSON.stringify(userProfile.userTypeId));
                setIsLoggedIn(true)

                if (userProfile.userTypeId === 1) {
                    setIsAdmin(true)
                } else {
                    setIsAdmin(false)
                }
            });
    };

    const logout = () => {
        return firebase.auth().signOut()
            .then(() => {
                sessionStorage.clear()
                setIsLoggedIn(false);
            });
    };

    const register = (userProfile, password) => {
        return firebase.auth().createUserWithEmailAndPassword(userProfile.email, password)
            .then((createResponse) => saveUser({ ...userProfile, firebaseUserId: createResponse.user.uid }))
            .then((savedUserProfile) => {
                sessionStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
                setIsLoggedIn(true)

                if (userProfile.userTypeId === 1) {
                    setIsAdmin(true)
                } else {
                    setIsAdmin(false)
                }
            });
    };

    const getToken = () => firebase.auth().currentUser.getIdToken();

    const getAllUserProfiles = () => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then(setUserProfiles)
        );
    };

    const getUserProfile = (firebaseUserId) => {
        return getToken().then((token) =>
            fetch(`${apiUrl}/${firebaseUserId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(resp => resp.json()));
    };

    const saveUser = (userProfile) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userProfile)
            }).then(resp => resp.json()));
    };

    return (
        <UserProfileContext.Provider value={{ isLoggedIn, isAdmin, login, logout, register, getToken, userProfiles, getAllUserProfiles }}>
            {isFirebaseReady
                ? props.children
                : <Spinner className="app-spinner dark" />}
        </UserProfileContext.Provider>
    );
}