import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ButtonGroup } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import { ChromePicker } from 'react-color';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setBoard, deleteBoard, createPostit } from '../../actions/index';
import Postit from './Postit';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      padding: '1rem',
      margin: theme.spacing(1.2),
      width: '30%',
    },
  },
  errors: {
    color: 'red',
    width: '85%',
    textAlign: 'left',
    display: 'inline-block',
  },
}));

function Board() {
  const classes = useStyles();
  const { id } = useParams();
  const index = useSelector((state) => state.index);
  const board = useSelector((state) => state.boards[index]);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPostit, setNewPostit] = useState({
    type: 'postit',
    board: '0',
    title: '',
    text: '',
    visible: true,
    color: '#000000',
  });

  const [errors, setErrors] = useState({
    title: 'noError',
    text: 'noError',
    color: 'noError',
  });

  useEffect(() => {
    if (id !== index) {
      dispatch(setBoard(parseInt(id, 10)));
    }

    if (id !== newPostit.board) {
      setNewPostit({ ...newPostit, board: parseInt(id, 10) + 1 });
    }
  }, [id]);

  const resetNewPostit = () => {
    setNewPostit({
      type: 'postit',
      board: parseInt(id, 10) + 1,
      title: '',
      text: '',
      visible: true,
      color: '#000000',
    });
  };

  const handleDeleteBoard = () => {
    dispatch(deleteBoard(board.id));
  };

  const handleCreatePostit = () => {
    const newErrors = {
      title: newPostit.title === '' ? 'Le titre ne doit pas être vide' : 'noError',
      text: newPostit.text === '' ? 'Le texte ne doit pas être vide' : 'noError',
      color: 'noError',
    };

    setErrors(newErrors);

    if (newErrors.title === 'noError' && newErrors.text === 'noError') {
      dispatch(createPostit(newPostit));
      setIsModalOpen(false);
      resetNewPostit();
    }
  };

  const handleCancelPostit = () => {
    setIsModalOpen(false);
    resetNewPostit();
  };

  return (
    <div>
      {
        board !== undefined
        && (
          <>
            <ButtonGroup variant="contained">
              <Button color="secondary" onClick={() => { handleDeleteBoard(); }}>
                Supprimer le Board
              </Button>
              <Button color="primary" onClick={() => { setIsModalOpen(true); }}>
                Ajouter un Postit
              </Button>
            </ButtonGroup>
            <div className={classes.root}>
              {
                board.postits.map((postit, i) => (
                  postit.visible
                  && <Postit postit={postit} i={i} key={`${postit.text}-${postit.title}`} />
                ))
              }
            </div>
            <Dialog open={isModalOpen} onClose={() => { setIsModalOpen(false); }} aria-labelledby="form-dialog-title">
              <DialogTitle id="form-dialog-title">Créer un nouveau Postit</DialogTitle>
              <DialogContent>
                <Select
                  labelId="Type"
                  id="type"
                  value={newPostit.type}
                  onChange={(e) => { setNewPostit({ ...newPostit, type: e.target.value }); }}
                >
                  <MenuItem value="postit">Postit</MenuItem>
                </Select>
                <TextField
                  margin="dense"
                  id="title"
                  label="Titre"
                  type="text"
                  value={newPostit.title}
                  onChange={(e) => { setNewPostit({ ...newPostit, title: e.target.value }); }}
                  fullWidth
                />
                {
                  errors.title !== 'noError'
                  && <span className={classes.errors}>{ errors.title }</span>
                }
                <TextField
                  margin="dense"
                  id="text"
                  label="Texte"
                  type="text"
                  value={newPostit.text}
                  onChange={(e) => { setNewPostit({ ...newPostit, text: e.target.value }); }}
                  fullWidth
                />
                {
                  errors.text !== 'noError'
                  && <span className={classes.errors}>{ errors.text }</span>
                }
                <FormControlLabel
                  control={(
                    <Checkbox
                      color="primary"
                      checked={newPostit.visible}
                      onChange={(e) => {
                        setNewPostit({ ...newPostit, visible: e.target.checked });
                      }}
                      inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                  )}
                  label="Visible"
                />
                <ChromePicker
                  disableAlpha
                  name="color"
                  color={newPostit.color}
                  onChange={(color) => { setNewPostit({ ...newPostit, color: color.hex }); }}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => { handleCancelPostit(); }} color="secondary">
                  Annuler
                </Button>
                <Button onClick={() => { handleCreatePostit(); }} color="primary">
                  Créer
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )
      }
    </div>
  );
}

export default Board;
