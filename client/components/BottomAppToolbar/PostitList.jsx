import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PostItLogo from '../../assets/images/postit.png';

const useStyles = makeStyles({
  list: {
    width: 250,
    height: '100%',
    backgroundColor: '#3f51b5',
  },
  textList: {
    color: 'white',
    outline: 'none',
    '& span': {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      textDecoration: 'none',
    },
  },
  svgIcon: {
    color: 'white',
    paddingRight: '1rem',
  },
  appLogo: {
    width: '100px',
    display: 'block',
    margin: '2rem auto',
  },
});

function PostitList({ setIsMenuOpen }) {
  const classes = useStyles();
  const index = useSelector((state) => state.index);
  const postits = useSelector((state) => state.boards[index].postits);

  return (
    <div
      className={clsx(classes.list)}
      role="presentation"
      onClick={() => { setIsMenuOpen(false); }}
      onKeyDown={() => { setIsMenuOpen(false); }}
    >
      <List>
        <img className={classes.appLogo} src={PostItLogo} alt="Logo App The Board" />
        {
          postits.map((postit, id) => (
            <Link to={`/board/${index}/${id}`} key={postit.title}>
              <ListItem button>
                <SpeakerNotesIcon className={classes.svgIcon} />
                <ListItemText primary={postit.title} className={classes.textList} />
              </ListItem>
            </Link>
          ))
        }
      </List>
    </div>
  );
}

PostitList.propTypes = {
  setIsMenuOpen: PropTypes.func.isRequired,
};

export default PostitList;
