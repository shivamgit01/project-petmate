import "./App.css";
import Header from "./components/Header.js";
import Footer from "./components/Footer";
import Home from "./components/Home.js";
import PetDetails from "./components/PetDetails";
import Pets from "./components/Pets";
import Login from "./components/user/Login";
import NewPet from "./components/NewPet";
import SignUp from "./components/user/SignUp";
import MyCreatedPets from "./components/MyCreatedPets";
import store from "./store";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import React from "react";
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import UserAccount from "./components/user/UserAccount";
import RequestAdoption from "./components/RequestAdoption";
import RequestModal from "./components/RequestModal";
import MyRequestsList from "./components/MyRequestsList";
import PetRequestsList from "./components/PetRequestsList";
import NotFound from "./components/NotFound";

export default function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Router>
      <Header />

      <Routes>
        {isAuthenticated && (
          <>
            <Route
              exact
              path="/account"
              element={<UserAccount user={user} />}
            />
            <Route exact path="/mypets" element={<MyCreatedPets />} />
            <Route exact path="/newpet" element={<NewPet />} />
            <Route exact path="/mypets" element={<MyCreatedPets />} />
            <Route exact path="/adopt/:id" element={<RequestAdoption />} />
            <Route exact path="/requests" element={<MyRequestsList />} />
            <Route exact path="/request/:id" element={<PetRequestsList />} />
          </>
        )}

        <Route exact path="/" element={<Home />} />
        <Route exact path="/pet/:id" element={<PetDetails />} />
        <Route exact path="/pets" element={<Pets />} />
        <Route path="/pets/:keyword" element={<Pets />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        {!isAuthenticated && (
          <Route exact path="/request/:id" element={<NotFound />} />
        )}

        <Route exact path="/modal" element={<RequestModal />} />

        <Route element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}
