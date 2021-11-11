import * as api from '../api';
import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, START_LOAD, END_LOAD, FETCH_POST } from '../constants/actionTypes';

// Action Creators
export const getPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOAD });
    const { data } = await api.fetchPost(id);
    console.log(data)
    dispatch({
      type: FETCH_POST,
      payload: data,
    });
    dispatch({ type: END_LOAD });
  } catch (err) {
    console.log(err);
  }

};
export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOAD });
    const { data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);

    dispatch({
      type: FETCH_ALL,
      payload: { data, currentPage, numberOfPages },
    });
    dispatch({ type: END_LOAD });
  } catch (err) {
    console.log(err);
  }
};

export const getPostsBySearch = ({ query, tag }) => async (dispatch) => {
  try {
    dispatch({ type: START_LOAD });
    const { data: { data } } = await api.fetchPostsBySearch(query, tag);

    dispatch({
      type: FETCH_BY_SEARCH,
      payload: data,
    });
    dispatch({ type: END_LOAD });
  } catch (err) {
    console.log(err);
  }
};

export const createPost = (postData) => async (dispatch) => {
  try {
    dispatch({ type: START_LOAD });
    const { data } = await api.createPost(postData);
    
    dispatch({
      type: CREATE,
      payload: data,
    });
    dispatch({ type: END_LOAD });
  } catch (err) {
    console.log(err);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);

    dispatch({ type: DELETE, payload: id });
  } catch (err) {
    console.log(err);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);

    dispatch({ type: UPDATE, payload: data });
  } catch (err) {
    console.log(err);
  }
}