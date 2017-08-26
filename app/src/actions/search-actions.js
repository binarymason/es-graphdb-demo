import * as types from './action-types';
import elasticsearch from 'elasticsearch';
import AgentKeepAlive from 'agentkeepalive';

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
    type: 'Movie',
    body,
  })
}

const receiveSearchSuggestions = json => {
  return {
    type: types.RECEIVE_SEARCH_SUGGESTIONS,
    suggestions: json.hits.hits,
  }
}

export const fetchSearchSuggestions = (query) => {

  return (dispatch) => {
    dispatch({ type: types.FETCH_SEARCH_SUGGESTIONS, query })

    performMovieSearch(query)
      .then(
        json => dispatch(receiveSearchSuggestions(json)),
        error => console.error('An error occured.', error)
      )
  }
}