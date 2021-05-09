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
import { ViewAllOrdersWithParam } from "./OrderManagement/ViewAllOrdersWithParam";
import { OrderDetails } from "./OrderManagement/OrderDetails";
import OrderEditForm from "./OrderManagement/OrderEditForm";
import { ViewAllHolidays } from "./Holidays/ViewAllHolidays";
import { HolidayDetails } from "./Holidays/HolidayDetails";
import HolidayForm from "./Holidays/HolidayForm";
import HolidayEditForm from "./Holidays/HolidayEditForm";



export default function ApplicationViews() {
    const { isLoggedIn, isAdmin } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                <Route path="/orders" exact>
                    {isLoggedIn && isAdmin ? <ViewAllOrders /> : <Redirect to="/login" />}
                </Route>

                <Route path="/orders/:holidayId" exact>
                    {isLoggedIn && isAdmin ? <ViewAllOrdersWithParam /> : <Redirect to="/login" />}
                </Route>

                <Route path="/order/details/:id" exact>
                    {isLoggedIn && isAdmin ? <OrderDetails /> : <Redirect to="/login" />}
                </Route>

                <Route path="/order/edit/:id/:holidayId" exact>
                    {isLoggedIn && isAdmin ? <OrderEditForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/customers" exact>
                    {isLoggedIn && isAdmin ? <UserProfileList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/items" exact>
                    {isLoggedIn && isAdmin ? <ItemsList /> : <Redirect to="/login" />}
                </Route>

                <Route path="/holidays" exact>
                    {isLoggedIn && isAdmin ? <ViewAllHolidays /> : <Redirect to="/login" />}
                </Route>

                <Route path="/holiday/details/:id" exact>
                    {isLoggedIn && isAdmin ? <HolidayDetails /> : <Redirect to="/login" />}
                </Route>

                <Route path="/holiday/holidayform" exact>
                    {isLoggedIn && isAdmin ? <HolidayForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/holiday/edit/:id" exact>
                    {isLoggedIn && isAdmin ? <HolidayEditForm /> : <Redirect to="/login" />}
                </Route>

                <Route path="/" exact>
                    {isLoggedIn ? <Hello /> : <Redirect to="/login" />}
                </Route>

                <Route path="/orderform/:id" exact>
                    {isLoggedIn ? <HolidayOrderForm /> : <Redirect to="/login" />}
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