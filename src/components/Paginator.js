import React from 'react'
import PropTypes from 'prop-types'

const Paginator = ({ pageNumber, totalPosts, clickHandler }) => {
  const firstNum = 1;
  //const lastNum = Math.floor(totalPosts/10)-1; //developer accounts cannot go past page 10
  const lastNum =10;
  return <span>
      <em> Showing {10*(pageNumber-1)+1}-{10*pageNumber} of {totalPosts}</em><br/>
      {pageNumber>firstNum+1
        &&<button onClick={e => clickHandler(firstNum)}>&laquo; &laquo; First</button>}
      {pageNumber>firstNum
        &&<button onClick={e => clickHandler(pageNumber-1)}>&laquo; Back Page</button>}
      <strong> Page {pageNumber} </strong>
      {pageNumber<lastNum&&
        <button onClick={e => clickHandler(pageNumber+1)}>Next Page &raquo;</button>}
      {pageNumber<lastNum-1&&
      <button onClick={e => clickHandler(lastNum)}>Last &raquo;&raquo;</button>}
      <br/><br/><small><em>Note developer accounts at newsapi.org cannot search past 100 posts</em></small>
  </span>
}

Paginator.propTypes = {
    pageNumber: PropTypes.number.isRequired,
    totalPosts: PropTypes.number.isRequired,
    clickHandler: PropTypes.func.isRequired
}

export default Paginator
