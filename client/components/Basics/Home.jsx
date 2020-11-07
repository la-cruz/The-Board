import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BoardLogo from '../../assets/images/the_board.png';

const useStyles = makeStyles({
  appLogo: {
    maxHeight: '80%',
    maxWidth: '100vw',
    display: 'block',
    margin: '2rem auto',
  },
});

function Home() {
  const classes = useStyles();

  return (
    <div>
      <img className={classes.appLogo} src={BoardLogo} alt="Logo App The Board" />
    </div>
  );
}

export default Home;
