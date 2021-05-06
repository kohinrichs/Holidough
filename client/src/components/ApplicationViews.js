import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello/Hello";
import HolidayOrderForm from "./HolidayOrderForm/HolidayOrderForm";
import { UserProfileList } from "./UserProfiles/UserProfileList";
import { ItemsList } from "./Items/ItemsList";
import { ViewAllOrders } from "./OrderManagement/ViewAllOrders";
import { OrderDetails } from "./OrderManagement/OrderDetails";
import OrderEditForm from "./OrderManagement/OrderEditForm";
import { ViewAllHolidays } from "./Holidays/ViewAllHolidays";
import { HolidayDetails } from "./Holidays/HolidayDetails";
import HolidayForm from "./Holidays/HolidayForm";



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
                    {isLoggedIn ? <ViewAllOrders /> : <Redirect to="/login" />}
                </Route>

                {/* Need to add is logged in as Admin */}
                <Route path="/order/details/:id" exact>
                    {isLoggedIn ? <OrderDetails /> : <Redirect to="/login" />}
                </Route>

                {/* Need to add is logged in as Admin */}
                <Route path="/order/edit/:id/:holidayId" exact>
                    {isLoggedIn ? <OrderEditForm /> : <Redirect to="/login" />}
                </Route>

                {/* Need to add is logged in as Admin */}
                <Route path="/customers" exact>
                    {isLoggedIn ? <UserProfileList /> : <Redirect to="/login" />}
                </Route>

                {/* Need to add is logged in as Admin */}
                <Route path="/items" exact>
                    {isLoggedIn ? <ItemsList /> : <Redirect to="/login" />}
                </Route>

                {/* Need to add is logged in as Admin */}
                <Route path="/holidays" exact>
                    {isLoggedIn ? <ViewAllHolidays /> : <Redirect to="/login" />}
                </Route>

                {/* Need to add is logged in as Admin */}
                <Route path="/holiday/details/:id" exact>
                    {isLoggedIn ? <HolidayDetails /> : <Redirect to="/login" />}
                </Route>

                {/* Need to add is logged in as Admin */}
                <Route path="/holiday/holidayform" exact>
                    {isLoggedIn ? <HolidayForm /> : <Redirect to="/login" />}
                </Route>

                {/* Need to add is logged in as Admin
                <Route path="/holiday/edit/:id" exact>
                    {isLoggedIn ? <HolidayEditForm /> : <Redirect to="/login" />}
                </Route> */}

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