import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import DraftsIcon from "@mui/icons-material/Drafts";
import DashboardIcon from "@mui/icons-material/Dashboard";

const Sidemenu = ({ pathname }) => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    const mapPathToNav = {
      dossier: 1,
      factures: 2,
    };
    pathname === ""
      ? setSelectedIndex(0)
      : setSelectedIndex(mapPathToNav[pathname]);
  }, [pathname]);
  return (
    <List
      sx={{
        width: "100%",
        height: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
      }}
      component="nav"
    >
      <ListItemButton
        selected={selectedIndex === 0 && pathname === ""}
        onClick={(event) => {
          handleListItemClick(event, 0);
          navigate("/");
        }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 1 && pathname === "dossier"}
        onClick={(event) => {
          handleListItemClick(event, 1);
          navigate("/dossier");
        }}
      >
        <ListItemIcon>
          <FolderOpenIcon />
        </ListItemIcon>
        <ListItemText primary="Gestion dossier" />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 2 && pathname === "factures"}
        onClick={(event) => {
          handleListItemClick(event, 2);
          navigate("/new");
        }}
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
