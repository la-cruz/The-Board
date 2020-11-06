import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import ArrowLeft from '@material-ui/icons/ArrowBackIos';
import ArrowRight from '@material-ui/icons/ArrowForwardIos';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
  const { id, idPostit } = useParams();
  const postits = useSelector((state) => state.boards[id].postits)
    .filter((postit) => postit.visible);

  return (
    <>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={() => { setIsMenuOpen(true); }}>
            <MenuIcon />
          </IconButton>
          <div className={classes.grow} />
          {
            postits[parseInt(idPostit, 10) - 1]
            && (
              <Link to={`/board/${id}/${parseInt(idPostit, 10) - 1}`}>
                <IconButton color="inherit">
                  <ArrowLeft viewBox="-6 0 24 24" />
                </IconButton>
              </Link>
            )
          }
          {
            postits[parseInt(idPostit, 10) + 1]
            && (
              <Link to={`/board/${id}/${parseInt(idPostit, 10) + 1}`}>
                <IconButton edge="end" color="inherit">
                  <ArrowRight />
                </IconButton>
              </Link>
            )
          }
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isMenuOpen} onClose={() => { setIsMenuOpen(false); }}>
        <PostitList setIsMenuOpen={setIsMenuOpen} />
      </Drawer>
    </>
  );
}

export default BottomAppToolbar;
