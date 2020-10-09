import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import BoardList from './BoardList';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function AppToolbar({ boards, setIndex, index }) {
  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" onClick={() => { setIsMenuOpen(true); }} className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {boards[index].title}
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isMenuOpen} onClose={() => { setIsMenuOpen(false); }}>
        <BoardList boards={boards} setIndex={setIndex} setIsMenuOpen={setIsMenuOpen} />
      </Drawer>
    </div>
  );
}

AppToolbar.propTypes = {
  boards: PropTypes.instanceOf(Object).isRequired,
  setIndex: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default AppToolbar;
