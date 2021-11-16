import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import useStyles from './styles';

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const [comments, setComments] = useState([1, 2, 3, 4]);
  const [comment, setComment] = useState('')

  const handleClick = () => {

  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">Comments</Typography>
          {comments.map((comment, idx) => (
            <Typography key={idx} gutterBottom variant="subtitle1" >
              Comment {idx}
            </Typography>
          ))}
        </div>
        <div style={{ width: '70%' }}>
          <Typography gutterBottom variant="subtitle1" >
            Write a comment
          </Typography>
          <TextField 
            fullWidth
            rows={4}
            variant="outlined"
            label="Comment"
            multiline
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
          <Button style={{ marginTop: '10px' }} fullWidth disabled={!comment} variant="contained" onClick={handleClick}>
            Comment
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CommentSection