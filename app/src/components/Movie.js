import React from 'react';

const imdbLink = title => {
  const urlFriendly = title.split(' ').join('%20');
  return `http://www.imdb.com/find?q=${urlFriendly}&s=tt&ttype=ft`
}

const Movie = (props) => {
  return (
    <div>
      <p>{props.title} <a href={imdbLink(props.title)} target="_blank">View on IMDb</a></p>
    </div>
  );
};

Movie.defaultProps = {
  title: '',
}

export default Movie;
