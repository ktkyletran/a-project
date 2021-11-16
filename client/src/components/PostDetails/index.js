import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import { getPost } from '../../actions/posts';
import CommentSection from '../CommentSection';

import useStyles from './styles'


const PostDetails = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id, dispatch]);

  // useEffect(() => {
  //   if (post) {
  //     dispatch(getPostsBySearch({ query: 'none' }));
  //   }
  // }, [post]);

  if (!post) return null;

  if (isLoading) {
    <Paper elevation={6} className={classes.loadingPaper}>
      <CircularProgress size="7em" />
    </Paper>
  }

  const recommendedPost = posts.filter(({ _id }) => _id !== post._id);

  const openPost = (_id) => history.push(`/posts/${_id}`);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
          <div className={classes.section}>
            <Typography variant="h3" component="h2">{post.title}</Typography>
            {/* <Typography variant="h6" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography> */}
            <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
            <Divider style={{ margin: '20px 0' }} />
            <Typography variant="h6">Created by: {post.name}</Typography>
            <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
            <Divider  style={{ margin: '20px 0' }} />
            <CommentSection post={post} />
          </div>
          <div className={classes.imageSection}>
            <img className={classes.media} src={post.selectedFile || 'https://placeholder.com/150'} alt={post.title} />
          </div>
        </div>
        {recommendedPost.length && (
          <div className={classes.section}>
            <Typography gutterBottom variant="h5" >You may also like:</Typography>
            <Divider />
            <div className={classes.recommendedPosts}>
              {recommendedPost.slice(0,4).map(({ title, name, message, likes, selectedFile, _id }) => (
                <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                  <Typography gutterBottom variant="h6" >{title}</Typography>
                  <Typography gutterBottom variant="subtitle2" >{name}</Typography>
                  <Typography gutterBottom variant="subtitle2" >{message}</Typography>
                  <Typography gutterBottom variant="subtitle1" >Likes: {likes.length}</Typography>
                  <img src={selectedFile} width='200px' alt={title} />
                </div>
              ))}
            </div>
          </div>
        )}
    </Paper>
  )
}

export default PostDetails
