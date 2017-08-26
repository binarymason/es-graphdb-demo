import React, {PropTypes} from 'react';

const Movie = ({person}) => {
  return (
    <div>
      {person.lastname}, {person.firstname}
    </div>
  );
};

Movie.propTypes = {
  person: PropTypes.object.isRequired
};

export default Movie;
