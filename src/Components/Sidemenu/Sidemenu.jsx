import React from "react";
import { Link } from "react-router-dom";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import DraftsIcon from "@mui/icons-material/Drafts";
import DashboardIcon from "@mui/icons-material/Dashboard";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

const Sidemenu = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
    >
      <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0)}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>

      <Link to="/files" style={{ textDecoration: "none", color: "inherit" }}>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1)}
        >
          <ListItemIcon>
            <FolderOpenIcon />
          </ListItemIcon>
          <ListItemText primary="Gestion dossier" />
        </ListItemButton>
      </Link>

      <ListItemButton
        selected={selectedIndex === 2}
        onClick={(event) => handleListItemClick(event, 2)}
      >
        <ListItemIcon>
          <DraftsIcon />
        </ListItemIcon>
        <ListItemText primary="Drafts" />
      </ListItemButton>
    </List>
  );
};

export default Sidemenu;
