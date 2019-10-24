export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'
export const INVALIDATE_CURRENT = 'INVALIDATE_CURRENT'

export const SET_SEARCH_TERM = 'SET_SEARCH_TERM'
export const SET_PAGE_NUMBER = 'SET_PAGE_NUMBER'

export const setSearchTerm = searchTerm => ({
  type: SET_SEARCH_TERM,
  term: searchTerm
})

export const setPageNumber = pageNumber => ({
  type: SET_PAGE_NUMBER,
  pageNumber: pageNumber
})

export const invalidateCurrent = () => ({
  type: INVALIDATE_CURRENT,
})

export const requestPosts = (searchTerm, pageNumber) => ({
  type: REQUEST_POSTS,
  term: searchTerm,
  pageNumber: pageNumber
})

export const receivePosts = json => ({
  type: RECEIVE_POSTS,
  posts: json.articles,
  totalPosts: json.totalResults,
  receivedAt: Date.now()
})

//actually fetch posts
const fetchPosts = (term, pageNumber) => dispatch => {
  dispatch(requestPosts(term, pageNumber))
  const apiKey = process.env.REACT_APP_NEWS_API_KEY;
  const url = `https://newsapi.org/v2/everything?q=${term}&from=2019-10-23&to=2019-10-23&sortBy=popularity&pageSize=10&page=${pageNumber}&apiKey=${apiKey}`

  return fetch(url)
    .then(response => response.json())
    .then(json =>  dispatch(receivePosts(json)))
}


const shouldFetchPosts = (state) => {
  const posts = state.newsArticles;
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeeded =  () => (dispatch, getState) => {
  if (shouldFetchPosts(getState())) {
    return dispatch(fetchPosts(getState().selectedTerm.term, getState().newsArticles.pageNumber))
  }
}
