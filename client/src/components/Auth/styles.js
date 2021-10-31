import { makeStyles } from '@mui/styles';

export default makeStyles(() => ({
  paper: {
    marginTop: '6rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
  },
  root: {
    '& .MuiTextField-root': {
      margin: '1rem',
    },
  },
  avatar: {
    margin: '1rem',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: '3rem',
  },
  submit: {
    margin: '1rem 0',
  },
  googleButton: {
    margin: '0 0 1rem',
  },
}));