import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Landing,
  Messages,
  Signin,
  Signup,
  AllMeeting,
  MyMeeting,
} from "./pages";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <div className="relative w-screen h-screen">
      <Router>
        <div>
          <Navbar />
        </div>
        <div className="p-4">
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/message" element={<Messages />} />
            <Route exact path="/sign-in" element={<Signin />} />
            <Route exact path="/sign-up" element={<Signup />} />
            <Route exact path="/all-meeting" element={<AllMeeting />} />
            <Route exact path="/my-meeting" element={<MyMeeting />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
