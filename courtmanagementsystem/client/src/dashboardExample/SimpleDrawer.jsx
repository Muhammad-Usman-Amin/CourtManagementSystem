import React, { useEffect, useState } from "react";
import clsx from "clsx";
// import CssBaseline from '@material-ui/core/CssBaseline';

// import MuiAppBar from '@mui/material/AppBar';
// import MuiDrawer from '@mui/material/Drawer';
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Grid from "@material-ui/core/Grid";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import useStyles from "./dashboard";
import SettingsBrightnessIcon from "@material-ui/icons/SettingsBrightness";
import Tooltip from "@material-ui/core/Tooltip";
import EventSeatIcon from "@material-ui/icons/EventSeat";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import ControlCenter from "../components/Form/ControlCenter";
import CancelIcon from "@material-ui/icons/Cancel";
import { useDispatch, useSelector } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { updateControlCenter } from "./../actions/controlCenter";

const StyledBadge = withStyles((theme) => ({
  badge: {
    // right: -3,
    // top: 13,
    // border: `2px solid ${theme.palette.background.paper}`,
    // padding: "0 4px",
    fontSize: "8px",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}))(Badge);

export default function SimpleDrawer({ title }) {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  // const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const controlCenter = useSelector((state) => state.controlCenter[0]);
  const [themeMode, setThemeMode] = useState("Light"); // 'day' or 'night'

  useEffect(() => {
    if (!controlCenter?.themeMode) {
      return;
    } else {
      controlCenter.themeMode && setThemeMode(controlCenter.themeMode);
    }
  }, [controlCenter]);

  const toggleThemeMode = () => {
    setThemeMode((prevMode) => (prevMode === "Light" ? "Dark" : "Light"));
    // setThemeMode(() => (controlCenter[0].themeMode === "Light" ? "Dark" : "Light"));
  };

  const [poID, setPoId] = useState(null);
  useEffect(() => {
    if (controlCenter) setPoId(controlCenter._id);
    // console.log(controlCenter);
  }, [controlCenter]);

  useEffect(() => {
    if (poID)
      dispatch(
        updateControlCenter(controlCenter._id, {
          ...controlCenter,
          themeMode: themeMode,
        })
      );
  }, [themeMode]);

  return (
    <div className={classes.root}>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            {title}
          </Typography>

          <Tooltip title="Control Center">
            <IconButton color="inherit" onClick={handleOpenModal}>
              {/* <Badge
                // sx={{
                //   "& .MuiBadge-badge": { fontSize: "1px" }, // not working, will figure out later  
                // }}
                badgeContent={
                  controlPanel.length && controlPanel[0].courtNumber
                }
                color="secondary"
              >
                <EventSeatIcon />
              </Badge> */}
              <StyledBadge
                badgeContent={controlCenter && controlCenter.courtNumber}
                color="secondary"
              >
                <EventSeatIcon />
              </StyledBadge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Toggle Light/Dark theme">
            <IconButton color="inherit" onClick={toggleThemeMode}>
              <Badge badgeContent={themeMode} color="secondary">
                <SettingsBrightnessIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton color="inherit">
              <Badge badgeContent={13} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List className={classes.cursorPointer}>{mainListItems}</List>
        {/* <Divider /> */}
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={openModal}
          onClose={handleCloseModal}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={openModal}>
            <div className={classes.paperModel}>
              <Grid
                container
                spacing={2}
                alignContent="center"
                justify="space-between"
              >
                <Grid item xs={11} sm={11}>
                  <h2 id="transition-modal-title">Control Panel</h2>
                </Grid>
                <Grid
                  item
                  xs={1}
                  sm={1}
                  container
                  justify="flex-end"
                  alignItems="center"
                >
                  <Tooltip title="Close">
                    <IconButton color="inherit" onClick={handleCloseModal}>
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
              <ControlCenter />
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
}
