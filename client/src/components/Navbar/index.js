import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import decode from 'jwt-decode';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@mui/material';
import useStyles from './styles';

const Navbar = () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });

    history.push('/auth');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
    // eslint-disable-next-line
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h2" align="center">A-Project</Typography>
      </div>
      <Toolbar className={classes.toolbar}>
        {user ?  (
          <div className={classes.profile}>
            <Avatar alt={user.userData.name} src={user.userData.imageUrl} >
              {user.userData.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">{user.userData.name}</Typography>
            <Button variant="contained" className={classes.logout} color="error" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button component={Link} to='/auth' variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
