import React from "react";
import { Link } from "react-router-dom";
import { Pagination, PaginationItem  } from "@mui/material";
import useStyles from './styles';

const Paginate = () => {
  const classes = useStyles();

  return (
    <Pagination 
      classes={classes.ul}
      count={5}
      page={1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem  {...item} component={Link} to={`/posts?page=${1}`} style={{margin: '4px'}} />
      )}
    />
  )
}

export default Paginate;
