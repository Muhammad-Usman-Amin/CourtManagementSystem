import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link } from 'react-router-dom';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import FolderIcon from '@material-ui/icons/Folder';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

export const mainListItems = (
    <div>
        <ListItem button component={Link} to='/'>
            <ListItemIcon >
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to='/FormCases'>
            <ListItemIcon >
                <CreateNewFolderIcon />
            </ListItemIcon>
            <ListItemText primary="Add New Case" />
        </ListItem>
        <ListItem button component={Link} to='/CauseLists'>
            <ListItemIcon>
                <ListAltRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Cause Lists" />
        </ListItem>
        <ListItem button component={Link} to='/Cases'>
            <ListItemIcon>
                {/* <PeopleIcon /> */}
                <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="Cases" />
        </ListItem>
        <ListItem button component={Link} to='/FormEmployeeData'>
            <ListItemIcon>
                <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Add New Employee" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <LayersIcon />
            </ListItemIcon>
            <ListItemText primary="Integrations" />
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