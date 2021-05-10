import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Hello from "./Hello/Hello";
import { GoBack } from "./Hello/GoBack";
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
import { ProductionNumbers } from "./Production Numbers/ProductionNumbers";


export default function ApplicationViews() {
    const { isLoggedIn, isAdmin } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                <Route path="/orders" exact>
                    {isLoggedIn && isAdmin ? <ViewAllOrders /> : <Redirect to="/goback" />}
                </Route>

                <Route path="/productionnumbers" exact>
                    {isLoggedIn && isAdmin ? <ProductionNumbers /> : <Redirect to="/goback" />}
                </Route>

                <Route path="/orders/:holidayId" exact>
                    {isLoggedIn && isAdmin ? <ViewAllOrdersWithParam /> : <Redirect to="/goback" />}
                </Route>

                <Route path="/order/details/:id" exact>
                    {isLoggedIn && isAdmin ? <OrderDetails /> : <Redirect to="/goback" />}
                </Route>

                <Route path="/order/edit/:id/:holidayId" exact>
                    {isLoggedIn && isAdmin ? <OrderEditForm /> : <Redirect to="/goback" />}
                </Route>

                <Route path="/customers" exact>
                    {isLoggedIn && isAdmin ? <UserProfileList /> : <Redirect to="/goback" />}
                </Route>

                <Route path="/items" exact>
                    {isLoggedIn && isAdmin ? <ItemsList /> : <Redirect to="/goback" />}
                </Route>

                <Route path="/holidays" exact>
                    {isLoggedIn && isAdmin ? <ViewAllHolidays /> : <Redirect to="/goback" />}
                </Route>

                <Route path="/holiday/details/:id" exact>
                    {isLoggedIn && isAdmin ? <HolidayDetails /> : <Redirect to="/goback" />}
                </Route>

                <Route path="/holiday/holidayform" exact>
                    {isLoggedIn && isAdmin ? <HolidayForm /> : <Redirect to="/goback" />}
                </Route>

                <Route path="/holiday/edit/:id" exact>
                    {isLoggedIn && isAdmin ? <HolidayEditForm /> : <Redirect to="/goback" />}
                </Route>

                <Route path="/" exact>
                    {isLoggedIn && !isAdmin ? <Hello /> : <Redirect to="/orders" />}
                </Route>

                <Route path="/orderform/:id" exact>
                    {isLoggedIn && !isAdmin ? <HolidayOrderForm /> : <Redirect to="/goback" />}
                </Route>

                <Route path="/goback" exact>
                    {isLoggedIn ? <GoBack /> : <Redirect to="/login" />}
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