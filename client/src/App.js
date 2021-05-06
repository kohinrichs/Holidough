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
import { ItemProvider } from './providers/ItemProvider';
import { CategoryProvider } from './providers/CategoryProvider';
import { PickUpDayProvider } from './providers/PickUpDayProvider';
import { PickUpTimeProvider } from './providers/PickUpTimeProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <HolidayProvider>
          <HolidayPickUpDayProvider>
            <HolidayPickUpTimeProvider>
              <CategoryProvider>
                <PickUpDayProvider>
                  <PickUpTimeProvider>
                    <HolidayItemProvider>
                      <OrderProvider>
                        <ItemProvider>
                          <OrderItemProvider>
                            <Header />
                            <ApplicationViews />
                          </OrderItemProvider>
                        </ItemProvider>
                      </OrderProvider>
                    </HolidayItemProvider>
                  </PickUpTimeProvider>
                </PickUpDayProvider>
              </CategoryProvider>
            </HolidayPickUpTimeProvider>
          </HolidayPickUpDayProvider>
        </HolidayProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;

