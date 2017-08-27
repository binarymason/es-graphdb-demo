import React, {Component} from 'react';

const GOOGLE_IMG_ENDPOINT = 'https://www.googleapis.com/customsearch/v1';

const urlEncode = (str, delimeter = '+') => {
  return str.split(' ').join(delimeter);
}

const googleImgEndpoint = query => {
  const cx = process.env.REACT_APP_GOOGLE_CX;
  const key = process.env.REACT_APP_GOOGLE_API_KEY;
  const q = urlEncode(`${query} Movie Poster`);

  if (!cx) return console.error('missing google cx!');
  if (!key) return console.error('missing google api key!');

  return  `${GOOGLE_IMG_ENDPOINT}?q=${q}&cx=${cx}&imgSize=medium&imgType=photo&num=1&searchType=image&key=${key}`
}

const imdbLink = (title) => {
  const urlFriendly = urlEncode(title, '%20')
  return `http://www.imdb.com/find?q=${urlFriendly}&s=tt&ttype=ft`
}


class Movie extends Component {
  constructor(props) {
    super(props)
    this.state = { movieImg: '#' }

  }
  componentDidMount() {
    fetch(googleImgEndpoint(this.props.title))
      .then(res => res.json())
      .then(json => {
        this.setState({movieImg: json.items[0].link});
      })
  }


  render() {
    return (
      <div>
        <img src={this.state.movieImg} alt="cover"/>
      <p>{this.props.title} <a href={imdbLink(this.props.title)} target="_blank">View on IMDb</a></p>
    </div>
    );
  }
};

Movie.defaultProps = {
  title: '',
}

export default Movie;
