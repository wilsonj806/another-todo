import React, { useState, useContext, FunctionComponent } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

import { NavProps } from '../../types/index';
const DRAWER_WIDTH = 240;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: DRAWER_WIDTH,
        flexShrink: 0,
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: DRAWER_WIDTH,
    },
  }),
);

const Nav : FunctionComponent<NavProps> = props => {
  const { container } = props;

  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <AppBar
        position="fixed"
        className={ classes.appBar }
      >
        <Toolbar>
          <Typography variant="h6">
            Todo again
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={ classes.drawer }>
        <Drawer
          open={ true }
          variant="permanent"
          container={ container }
          classes={{ paper: classes.drawerPaper }}
          anchor={ theme.direction === 'rtl' ? 'right' : 'left' }
        >
          <div>
            <div className={ classes.toolbar } />
            <Typography paragraph={ true }>
              KONO DIO DAAA
            </Typography>
          </div>
        </Drawer>
      </nav>
    </>
  )
}

export default Nav;
export { DRAWER_WIDTH };