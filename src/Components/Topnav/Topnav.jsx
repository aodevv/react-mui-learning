import React from "react";

import { connect } from "react-redux";
import { LogOut } from "../../redux/Auth/Auth.actions";
import { selectUsername } from "../../redux/Auth/Auth.selectors";
import { createStructuredSelector } from "reselect";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";

const Topnav = ({ sideNav, setSideNav, LogOut, username }) => {
  const mapUsername = {
    muni: "Municipalité",
    admin: "Administrateur",
    user: "John Doe",
  };

  const toggleSideNav = () => {
    setSideNav(!sideNav);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleSideNav}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            App
          </Typography>
          <PersonIcon />
          <Typography mr={4} ml={1} variant="h6" component="div">
            {mapUsername[username]}
          </Typography>
          <Button onClick={() => LogOut()} color="inherit">
            Déconnexion
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const mapStateToProps = createStructuredSelector({
  username: selectUsername,
});

const mapDispatchToProps = (dispatch) => ({
  LogOut: () => dispatch(LogOut()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Topnav);
