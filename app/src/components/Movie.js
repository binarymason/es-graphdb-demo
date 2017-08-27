import React from 'react';
import urlEncode from '../common';

const imdbLink = (title) => {
  const withoutParens = title.replace(/\s\(.*\)/, '');
  const urlFriendly = urlEncode(withoutParens, '%20');
  return `http://www.imdb.com/find?q=${urlFriendly}&s=tt&ttype=ft`
}


const Movie = (props) => {
  const link = imdbLink(props.title);

  return (
    <div>
      {
        props.img ? (
          <a href={link} target="_blank">
            <img src={props.img} alt="cover"/>
          </a>
        ) : (
        <p>loading image...</p>
        )
      }
      <p>{props.title} <a href={link} target="_blank">View on IMDb</a></p>
    </div>
  );
}

Movie.defaultProps = {
  title: '',
}

export default Movie;
