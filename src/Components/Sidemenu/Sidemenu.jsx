import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

//ICONS
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ConstructionIcon from "@mui/icons-material/Construction";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PrecisionManufacturingOutlinedIcon from "@mui/icons-material/PrecisionManufacturingOutlined";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import SignpostOutlinedIcon from "@mui/icons-material/SignpostOutlined";

const Sidemenu = ({ pathname }) => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    const mapPathToNav = {
      dossier: 1,
      factures: 3,
      salaires: 4,
      machineries: 5,
      sites: 6,
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
        selected={selectedIndex === 6 && pathname === "sites"}
        onClick={(event) => {
          handleListItemClick(event, 6);
          navigate("/sites");
        }}
      >
        <ListItemIcon>
          <SignpostOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Sites" />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 3 && pathname === "factures"}
        onClick={(event) => {
          handleListItemClick(event, 3);
          navigate("/factures");
        }}
      >
        <ListItemIcon>
          <ReceiptOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Factures" />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 4 && pathname === "salaires"}
        onClick={(event) => {
          handleListItemClick(event, 4);
          navigate("/salaires");
        }}
      >
        <ListItemIcon>
          <AttachMoneyIcon />
        </ListItemIcon>
        <ListItemText primary="Salaires" />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 5 && pathname === "machineries"}
        onClick={(event) => {
          handleListItemClick(event, 5);
          navigate("/machineries");
        }}
      >
        <ListItemIcon>
          <PrecisionManufacturingOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Machineries" />
      </ListItemButton>
    </List>
  );
};

export default Sidemenu;
