import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello/Hello";
import HolidayOrderForm from "./HolidayOrderForm/HolidayOrderForm";
import { UserProfileList } from "./UserProfiles/UserProfileList";
import { ItemsList } from "./Items/ItemsList";


export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
                </Route>

                <Route path="/orderform/:id" exact>
                    {isLoggedIn ? <HolidayOrderForm /> : <Redirect to="/login" />}
                </Route>

                {/* Need to add is logged in as Admin */}
                <Route path="/orders" exact>
                    {isLoggedIn ? <HolidayOrderForm /> : <Redirect to="/login" />}
                </Route>

                {/* Need to add is logged in as Admin */}
                <Route path="/customers" exact>
                    {isLoggedIn ? <UserProfileList /> : <Redirect to="/login" />}
                </Route>

                {/* Need to add is logged in as Admin */}
                <Route path="/items" exact>
                    {isLoggedIn ? <ItemsList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </main>
    );
};