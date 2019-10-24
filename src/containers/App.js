import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { setSearchTerm, fetchPostsIfNeeded, invalidateCurrent , setPageNumber } from '../actions'
import Search from '../components/Search'
import Posts from '../components/Posts'
import Paginator from '../components/Paginator'

class App extends Component {
  static propTypes = {
    searchTerm: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired,
    pageNumber: PropTypes.number.isRequired,
    totalPosts: PropTypes.number.isRequired,
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPostsIfNeeded())
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      const { dispatch } = this.props
      dispatch(fetchPostsIfNeeded())
    }
  }

  handleSearchTermChange = term => {
    this.props.dispatch(setSearchTerm(term))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch } = this.props
    dispatch(invalidateCurrent())
    //reset page number when getting a new search term
    dispatch(setPageNumber(1));
    dispatch(fetchPostsIfNeeded())
  }

  handlePageChange = (pageNumber) => {
    const { dispatch } = this.props

    dispatch(invalidateCurrent())
    //move the page number
    dispatch(setPageNumber(pageNumber));
    dispatch(fetchPostsIfNeeded())
  }

  render() {
    const { searchTerm, posts, isFetching, lastUpdated, pageNumber, totalPosts } = this.props
    const isEmpty = posts.length === 0
    return (
      <div>
        <Search value={searchTerm} onChange={this.handleSearchTermChange} />
        {!isFetching &&
        <button onClick={this.handleRefreshClick}>
          Update Search Now
        </button>
        }
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
              {' '}
            </span>
          }
        </p>
        {isEmpty
          ? (isFetching ? <h2>Loading...</h2> : <h2>Empty.</h2>)
          : <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <Posts posts={posts} />
              <Paginator pageNumber={pageNumber} totalPosts={totalPosts} clickHandler={this.handlePageChange} />
            </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedTerm, newsArticles } = state
  const {
    isFetching,
    lastUpdated,
    posts,
    pageNumber,
    totalPosts
  } = newsArticles || {
    isFetching: true,
    posts: [],
    pageNumber:1,
    totalPosts:0.
  }
  let searchTerm = selectedTerm.term;
  return {
    searchTerm,
    posts,
    isFetching,
    lastUpdated,
    pageNumber,
    totalPosts
  }
}

export default connect(mapStateToProps)(App)
