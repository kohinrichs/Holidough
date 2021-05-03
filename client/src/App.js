import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { HolidayProvider } from './providers/HolidayProvider';
import { HolidayPickUpDayProvider } from './providers/HolidayPickUpDayProvider';
import { HolidayPickUpTimeProvider } from './providers/HolidayPickUpTimeProvider';
import { HolidayItemProvider } from './providers/HolidayItemProvider';
import { OrderProvider } from './providers/OrderProvider';
import { OrderItemProvider } from './providers/OrderItemProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <HolidayProvider>
          <HolidayPickUpDayProvider>
            <HolidayPickUpTimeProvider>
              <HolidayItemProvider>
                <OrderProvider>
                  <OrderItemProvider>
                    <Header />
                    <ApplicationViews />
                  </OrderItemProvider>
                </OrderProvider>
              </HolidayItemProvider>
            </HolidayPickUpTimeProvider>
          </HolidayPickUpDayProvider>
        </HolidayProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;

