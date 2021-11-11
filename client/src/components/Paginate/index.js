import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Pagination, PaginationItem  } from "@mui/material";
import useStyles from './styles';
import { getPosts } from "../../actions/posts";

const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.posts)
  const classes = useStyles();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
    }
  }, [page, dispatch])

  return (
    <Pagination 
      className={classes.ul}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem  {...item} component={Link} to={`/posts?page=${item.page}`} style={{margin: '4px'}} />
      )}
    />
  )
}

export default Paginate;
