import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BoardList from './BoardList';
import { createBoard } from '../../actions/index';

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

function AppToolbar() {
  const classes = useStyles();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boardTitle, setBoardTitle] = useState('');
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const index = useSelector((state) => state.index);

  const handleCreateBoard = () => {
    dispatch(createBoard({ title: boardTitle, notes: '' }));
    setIsModalOpen(false);
    setBoardTitle('');
  };

  const handleCancelBoard = () => {
    setIsModalOpen(false);
    setBoardTitle('');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" onClick={() => { setIsMenuOpen(true); }} className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {
              boards.length > index
              && boards[index].title
            }
          </Typography>
          <Button variant="contained" color="default" onClick={() => { setIsModalOpen(true); }}>
            Créer un Board
          </Button>
        </Toolbar>
      </AppBar>
      <Dialog open={isModalOpen} onClose={() => { setIsModalOpen(false); }} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Créer un nouveau board</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Titre"
            type="text"
            value={boardTitle}
            onChange={(e) => { setBoardTitle(e.target.value); }}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { handleCancelBoard(); }} color="secondary">
            Annuler
          </Button>
          <Link to={`/board/${boards.length}`}>
            <Button onClick={() => { handleCreateBoard(); }} color="primary">
              Créer
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
      <Drawer anchor="left" open={isMenuOpen} onClose={() => { setIsMenuOpen(false); }}>
        {
          boards.length > 0
          && <BoardList setIsMenuOpen={setIsMenuOpen} />
        }
      </Drawer>
    </div>
  );
}

export default AppToolbar;
