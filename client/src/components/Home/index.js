import React, { useState, useEffect } from 'react';
import { Container, Grow, Grid, Paper, TextField, Button, AppBar } from '@mui/material';
import { useHistory, useLocation } from 'react-router';
import { useDispatch } from 'react-redux';
import { getPosts, getPostsBySearch } from '../../actions/posts'
import Posts from '../Posts';
import Form from '../Form';
import Paginate from '../Paginate';
import useStyles from './styles';

function useQuery () {
  return new URLSearchParams(useLocation().search)
};

const Home = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const searchQuery = query.get('query');
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState({
    query: '',
    tag: ''
  });
  console.log(searchQuery)
  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const searchPost = () => {
    if (search) {
      dispatch(getPostsBySearch(search));

      history.push(`/posts/search?query=${search.query || 'none'}&tag=${search.tag || 'none'}`)
    } else {
      history.push('/')
    }
  };

  return (
    <Grow in>
    <Container maxWidth="xl">
      <Grid container justify="space-between" alignItems="stretch" spacing={3}>
        <Grid item xs={12} sm={6} md={9}>
          <Posts setCurrentId={setCurrentId} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AppBar className={classes.appBar} position="static" color="inherit" style={{ padding: '15px', marginBottom: '20px' }}>
            <TextField 
              name="memory-search"
              variant="outlined"
              label="Search Memories"
              fullWidth
              value={search.query}
              onChange={(e) => setSearch({ ...search, query: e.target.value })}
              onKeyPress={handleKeyPress}
              style={{ marginBottom: '10px' }}
            />
            <TextField 
              name="tag-search"
              variant="outlined"
              label="Search By Tag"
              fullWidth
              value={search.tag}
              onChange={(e) => setSearch({ ...search, tag: e.target.value })}
              onKeyPress={handleKeyPress}
              style={{ marginBottom: '10px' }}
            />
            <Button onClick={searchPost} color="primary" variant="contained"> Search </Button>
          </AppBar>  
          <Form currentId={currentId} setCurrentId={setCurrentId} />
          {(!searchQuery && !search.tag) && (
          <Paper className={classes.pagination} elevation={6}>
            <Paginate page={page} />
          </Paper>
          )}
        </Grid>
      </Grid>
    </Container>
  </Grow>
  )
}

export default Home
