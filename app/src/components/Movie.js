import React, {Component} from 'react';

const GOOGLE_IMG_ENDPOINT = 'https://www.googleapis.com/customsearch/v1';

const urlEncode = (str, delimeter = '+') => {
  return str.split(' ').join(delimeter);
}

const googleImgEndpoint = query => {
  console.log(process.env)
  const cx = process.env.REACT_APP_GOOGLE_CX;
  const key = process.env.REACT_APP_GOOGLE_API_KEY;
  const q = urlEncode(query);

  if (!cx) return console.error('missing google cx!');
  if (!key) return console.error('missing google api key!');

  return  `${GOOGLE_IMG_ENDPOINT}?q=${q}&cx=${cx}=eng&imgType=photo&num=1&searchType=image&key=${key}`
}

const imdbLink = (title) => {
  const urlFriendly = urlEncode(title, '%20')
  return `http://www.imdb.com/find?q=${urlFriendly}&s=tt&ttype=ft`
}


class Movie extends Component {
  componentDidMount() {
    fetch(googleImgEndpoint(this.props.title))
      .then(data => console.log(data))
  }



  render() {
    return (
      <div>
        {Object.keys(process.env).map(k => <p>{k}</p>)}
      <p>{this.props.title} <a href={imdbLink(this.props.title)} target="_blank">View on IMDb</a></p>
    </div>
    );
  }
};

Movie.defaultProps = {
  title: '',
}

export default Movie;
