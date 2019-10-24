import React from 'react'
import PropTypes from 'prop-types'

const Search = ({ value, onChange }) => (
  <span>
    <h1>Search News Articles</h1>
    <input onChange={e => onChange(e.target.value)} value={value} />
  </span>
)

Search.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Search
