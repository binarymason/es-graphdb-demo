import React from 'react';
// import PropTypes from 'prop-types';
import Movie from './Movie';

const RelatedMoviesList = (props) => {
  const movies = props.movies || [];
  const renderMovie = movie => (
    <Movie {...movie._source} loading="none" />
  )

  return (
    <div>
      <h3>You might also like:</h3>
      {
        movies.map(movie => renderMovie(movie))
      }
    </div>

  )
}

export default RelatedMoviesList

// SearchContainer.propTypes = {
//   suggestions: PropTypes.array.isRequired,
//   actions: PropTypes.object.isRequired,
//   query: PropTypes.string.isRequired,
//   suggestionBrowsingIndex: PropTypes.number,
// };
//
