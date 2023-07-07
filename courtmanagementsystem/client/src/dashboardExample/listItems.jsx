import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { Link } from "react-router-dom";
import CreateNewFolderIcon from "@material-ui/icons/CreateNewFolder";
import FolderIcon from "@material-ui/icons/Folder";
import ListAltRoundedIcon from "@material-ui/icons/ListAltRounded";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Tooltip from "@material-ui/core/Tooltip";

export const mainListItems = (
  <div>
    <Tooltip title="Dashboard">
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Tooltip>

    <Tooltip title="Add New Case">
      <ListItem button component={Link} to="/FormCases">
        <ListItemIcon>
          <CreateNewFolderIcon />
        </ListItemIcon>
        <ListItemText primary="Add New Case" />
      </ListItem>
    </Tooltip>

    <Tooltip title="CauseList">
      <ListItem button component={Link} to="/CauseLists">
        <ListItemIcon>
          <ListAltRoundedIcon />
        </ListItemIcon>
        <ListItemText primary="Cause Lists" />
      </ListItem>
    </Tooltip>

    <Tooltip title="Cases">
      <ListItem button component={Link} to="/CasesListTable">
        <ListItemIcon>
          {/* <PeopleIcon /> */}
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary="Cases" />
      </ListItem>
    </Tooltip>

    <Tooltip title="Add New Employee">
      <ListItem button component={Link} to="/FormEmployeeData">
        <ListItemIcon>
          <PersonAddIcon />
        </ListItemIcon>
        <ListItemText primary="Add New Employee" />
      </ListItem>
    </Tooltip>

    <Tooltip title="Employee Data">
      <ListItem button component={Link} to="/EmployeeListTable">
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Employee Reports" />
      </ListItem>
    </Tooltip>

    <ListItem button component={Link} to="/CourtList">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Court List" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItem>
  </div>
);
