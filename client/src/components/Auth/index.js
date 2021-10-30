import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import InputField from '../InputField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from './styles';

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false)
  const isSignup = false;

  const handleSubmit = () => {

  };

  const handleChange = () => {

  };

  const handlePassword = () => setShowPassword((prevState) => !prevState);

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
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth
