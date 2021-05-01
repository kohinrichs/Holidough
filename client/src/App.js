import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import { UserProfileProvider } from "./providers/UserProfileProvider";
import Header from "./components/Header";
import ApplicationViews from "./components/ApplicationViews";
import { HolidayProvider } from './providers/HolidayProvider';

function App() {
  return (
    <Router>
      <UserProfileProvider>
        <HolidayProvider>
          <Header />
          <ApplicationViews />
        </HolidayProvider>
      </UserProfileProvider>
    </Router>
  );
}

export default App;

