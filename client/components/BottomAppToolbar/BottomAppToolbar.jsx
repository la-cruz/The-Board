import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import ArrowLeft from '@material-ui/icons/ArrowBackIos';
import ArrowRight from '@material-ui/icons/ArrowForwardIos';
import PostitList from './PostitList';

const useStyles = makeStyles(() => ({
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
}));

function BottomAppToolbar() {
  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={() => { setIsMenuOpen(true); }}>
            <MenuIcon />
          </IconButton>
          <div className={classes.grow} />
          <IconButton color="inherit">
            <ArrowLeft />
          </IconButton>
          <IconButton edge="end" color="inherit">
            <ArrowRight />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isMenuOpen} onClose={() => { setIsMenuOpen(false); }}>
        <PostitList setIsMenuOpen={setIsMenuOpen} />
      </Drawer>
    </>
  );
}

export default BottomAppToolbar;
