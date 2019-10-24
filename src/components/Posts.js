import React from 'react'
import PropTypes from 'prop-types'

const Posts = ({posts}) => (
  <ul>
    {posts.map((post, i) =>
      <li key={i}>
        <a href={post.url} target="_blank" rel="noopener noreferrer"><h3>{post.title}</h3></a>
        <em>{post.author} - {post.source.name}</em>
      </li>
    )}
  </ul>
)

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Posts
