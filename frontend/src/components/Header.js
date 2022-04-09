import React, { useState } from "react";
import Search from "./Search";
import "./css/Header.css";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
} from "mdb-react-ui-kit";

export default function App() {
  const [showBasic, setShowBasic] = useState(false);

  return (
    <MDBNavbar className="p-1 fixed-top" expand="lg" dark bgColor="secondary">
      <MDBContainer fluid>
        <MDBNavbarBrand href="/" className="petmate-logo">
          PetMate
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon="bars" fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic}>
          <MDBNavbarNav className="mr-auto mb-1 mb-lg-0 font-weight-bold">
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current="page" href="/">
                <i class="fas fa-home" style={{ marginRight: "7px" }}></i>Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/pets">
                <i class="fas fa-paw" style={{ marginRight: "7px" }}></i>
                Adopt
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href="/login">
                <i
                  class="fas fa-user-circle"
                  style={{ marginRight: "7px" }}
                ></i>
                Profile
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
          <Search />
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}
