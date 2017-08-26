import React, {PropTypes} from 'react';
import Movie from './Movie';

const ResultList = ({results}) => {
  console.log(results)
  return (
    <div>
      {results.map((person) => 
        <Movie key={person.lastname} person={person} />  
      )}
    </div>
  );
};

ResultList.propTypes = {
  results: PropTypes.array.isRequired
};

export default ResultList;
