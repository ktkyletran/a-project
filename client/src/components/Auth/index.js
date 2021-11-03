import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import { GoogleLogin } from 'react-google-login';
import { signIn, signUp } from '../../actions/auth'
import InputField from '../InputField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Icon from './Icon';
import useStyles from './styles';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [formData, setFormData] = useState(initialState);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signUp(formData, history));
    } else {
      dispatch(signIn(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  };
  
  const handlePassword = () => setShowPassword((prevState) => !prevState);

  const switchMode = () => {
    setIsSignup((prevState) => !prevState);
    setShowPassword(false)
  };

  const googleSuccess = async (res) => {
    const userData = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({
        type: 'AUTH',
        data: { userData, token }
      });

      history.push('/');
    } catch (err) {
      console.log(err)
    }
  };

  const googleFailure = (err) => {
    console.log(err)
    console.log('Google sign in was unsuccessful. Try again later.')
  };


  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">
          {isSignup ? 'Sign Up' : 'Sign In'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                  <InputField name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                  <InputField name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )
            }
            <InputField name="email" label="Email Address" handleChange={handleChange} type="email" />
            <InputField name="password" label="Password" handleChange={handleChange} handlePassword={handlePassword} type={showPassword ? "text" : "password"} />
            { isSignup && <InputField name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" /> }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
            { isSignup ? 'Sign Up' : 'Sign In' }
          </Button>
          <GoogleLogin 
            clientId={process.env.REACT_APP_GOOGLE_CLIENT}
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="success"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon/>} 
                variant="contained"
              >
                  Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignup ? 'Already have an account?' : "Don't have an account?" }
              </Button>
            </Grid> 
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth
