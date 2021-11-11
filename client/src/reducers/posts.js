import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, START_LOAD, END_LOAD, FETCH_POST } from '../constants/actionTypes';


const reducer = (state = { isLoading: true, posts: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      return {
        ...state,
        posts: action.payload,
      };
    case FETCH_POST:
      return {
        ...state,
        post: action.payload,
      };
    case CREATE:
      return { ...state, posts: [ ...state.posts, action.payload ] };
    case UPDATE:
      return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
    case LIKE:
      return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post) };
    case DELETE:
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) };
    case START_LOAD:
      return { ...state, isLoading: true };
    case END_LOAD:
      return { ...state, isLoading: false };
    default:
      return state;
  }
}

export default reducer;