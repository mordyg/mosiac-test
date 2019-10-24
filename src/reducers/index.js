import { combineReducers } from 'redux'
import {
  SET_SEARCH_TERM,
  INVALIDATE_CURRENT,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  SET_PAGE_NUMBER,
} from '../actions'

const selectedTerm= (state ={term:'apple'}, action) => {
  console.log(action);
  switch (action.type) {
    case SET_SEARCH_TERM:
      return {term:action.term}
    default:
      return state
  }
}

const newsArticles = (state = {
  isFetching: false,
  didInvalidate: true,
  posts: [],
  pageNumber:1,
  totalPosts:0,
}, action) => {
  switch (action.type) {
    case INVALIDATE_CURRENT:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        posts: action.posts,
        lastUpdated: action.receivedAt,
        totalPosts:action.totalPosts,
      }
    case SET_PAGE_NUMBER:
      return {
        ...state,
        pageNumber: action.pageNumber
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  newsArticles,
  selectedTerm
})

export default rootReducer
