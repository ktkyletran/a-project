import React from 'react'
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import useStyles from './styles';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const Likes = (likeCount) => {
    if (post.likes.length > 1) return (`${likeCount} Likes`)
    if (post.likes.length === 1) return (`${likeCount} Like`)
    if (post.likes.length === 0) return (`Like`)
  }

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post?.selectedFile} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.userData?.googleId === post?.creator || user?.userData?._id === post?.creator) && (
        <div className={classes.overlay2}>
          <Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
            <MoreHorizIcon fontSize="large" />
          </Button>
        </div>
      )}
      {/* <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div> */}
        <Typography className={classes.title} variant="h6">{post.title}</Typography>
      <CardContent>
        <Typography className={classes.desc} variant="body2" gutterBottom>{post.message}</Typography>
      </CardContent> 
      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.userData} onClick={() => dispatch(likePost(post._id))} >
          <ThumbUpAltIcon fontSize="small"/> &nbsp;
          {Likes(post.likes.length)}
        </Button>
        {(user?.userData?.googleId === post?.creator || user?.userData?._id === post?.creator) && (
          <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))} >
            <DeleteIcon fontSize="small"/>
            Delete
          </Button>
        )}
      </CardActions> 
    </Card>
  )
}

export default Post
