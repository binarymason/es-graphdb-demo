import * as types from './action-types';
import elasticsearch from 'elasticsearch';
import AgentKeepAlive from 'agentkeepalive';
import urlEncode from '../common';

// running clientside, so do not have docker networking
const ELASTICSEARCH_HOST = 'localhost:9200'

const client = new elasticsearch.Client({
  hosts: [ELASTICSEARCH_HOST],
  maxRetries: 10,
  keepAlive: true,
  maxSockets: 10,
  minSockets: 10,
  createNodeAgent: (connection, config) => {
    return new AgentKeepAlive(connection.makeAgentConfig(config));
  }
})


// eslint-disable-next-line
const checkHealth = () => {
  client.ping({
    requestTimeout: 30000,
  }, function (error) {
    if (error) {
      console.error('elasticsearch cluster is down!');
    } else {
      console.log('All is well');
    }
  });
}

const ELASTICSEARCH_INDEX = 'neo4j-index-node';
const RELATIONSHIPS_INDEX = 'neo4j-index-relationship';

const performMovieSearch = ({query}) => {
  const body = {
    query: {
      match_phrase_prefix: {
        title: {
          query,
          slop: 10,
        }
      }
    }
  };

  return client.search({
    index: ELASTICSEARCH_INDEX,
    type: 'movies',
    body,
  })
}

const receiveSearchSuggestions = json => {
  return {
    type: types.RECEIVE_SEARCH_SUGGESTIONS,
    suggestions: json.hits.hits,
  }
}

const receiveRelatedMovies = json => {
  const connections = json.connections;
  const prospects = connections.map(el => json.vertices[el.target]);
  const nonUnique = prospects.filter(el => (
    el.field === 'movie_title.keyword'
  )).sort((a,b) => a.weight + b.weight)

  const relatedMovies = Array.from(new Set(nonUnique)).map(el => {
    return { _source: { title: el.term }, weight: el.weight }
  })

  return {
    type: types.RECEIVE_RELATED_MOVIES,
    relatedMovies,
  }
}

export const fetchSearchSuggestions = ({query}) => {
  return (dispatch) => {
    dispatch({ type: types.FETCH_SEARCH_SUGGESTIONS, query })

    performMovieSearch({query})
      .then(
        json => dispatch(receiveSearchSuggestions(json)),
        error => console.error('An error occured.', error)
      )
  }
}

export const browseSearchSuggestion = (index) => {
  return {
    type: types.BROWSE_SEARCH_SUGGESTION,
    index
  }
}


const GOOGLE_IMG_ENDPOINT = 'https://www.googleapis.com/customsearch/v1';

const googleImgEndpoint = query => {
  const cx = process.env.REACT_APP_GOOGLE_CX;
  const key = process.env.REACT_APP_GOOGLE_API_KEY;
  const q = urlEncode(`${query} Movie Poster`);

  if (!cx) return console.error('missing google cx!');
  if (!key) return console.error('missing google api key!');

  return  `${GOOGLE_IMG_ENDPOINT}?q=${q}&cx=${cx}&imgSize=medium&imgType=photo&num=1&searchType=image&key=${key}`
}

export const selectSearchSuggestion = () => {
  return (dispatch, getState) => {
    const state = getState();
    const { suggestionBrowsingIndex, suggestions } = state.search;
    const selectedMovie = suggestions[suggestionBrowsingIndex];

    dispatch({
      type: types.SELECT_SEARCH_SUGGESTION,
      selection: selectedMovie,
    })

    if (!selectedMovie) return;

    fetch(googleImgEndpoint(selectedMovie._source.title))
      .then(res => res.json())
      .then(json => {
        dispatch({
          type: types.RECEIVE_GOOGLE_IMAGE,
          img: json.items[0].link
        })
      })
  }
}

const relatedMovieQuery = ({movieTitle, gender}) => {
  const oppositeGender = gender.toLowerCase() === 'm' ? 'F' : 'M';

  return {
    "query": {
      "bool": {
        "must_not": [
          {
            "term": {
              "movie_title": movieTitle
            }
          },
          {
            "term": {
              "user_gender.keyword": oppositeGender
            }
          }
        ]
      }
    },
    "controls": {
      "use_significance": false,
      "sample_size": 2000,
      "timeout": 5000
    },
    "connections": {
      "vertices": [
        {
          "field": "movie_title.keyword",
          "size": 5,
          "min_doc_count": 3,
          "exclude": [
            movieTitle
          ]
        },
        {
          "field": "user_gender.keyword",
          "size": 5,
          "min_doc_count": 3,
          "exclude": [
            oppositeGender
          ]
        }
      ]
    },
    "vertices": [
      {
        "field": "movie_title.keyword",
        "size": 5,
        "min_doc_count": 3,
        "exclude": [
          movieTitle
        ]
      },
      {
        "field": "user_gender.keyword",
        "size": 5,
        "min_doc_count": 3,
        "exclude": [
          oppositeGender
        ]
      }
    ]
  }
}


const RELATIONSHIP_ENDPOINT = `http://${ELASTICSEARCH_HOST}/${RELATIONSHIPS_INDEX}/_xpack/_graph/_explore`

export const performRelatedMovieSearch = ({movieTitle, gender}) => {
  return (dispatch) => {
    const body = relatedMovieQuery({ movieTitle, gender })

    dispatch({ type: types.FETCH_RELATED_MOVIES });

    const requestConfig = {
      method: 'POST',
      body: JSON.stringify(body),
    };

    fetch(RELATIONSHIP_ENDPOINT, requestConfig)
      .then(res => res.json())
      .then(
        json => dispatch(receiveRelatedMovies(json)),
        error => console.error('An error occured.', error)
      )
  }
}

export const genderChange = gender => {
  return { type: types.GENDER_CHANGE, gender };
}
