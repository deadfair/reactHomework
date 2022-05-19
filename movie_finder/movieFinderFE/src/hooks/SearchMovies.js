
import {gql, useLazyQuery} from '@apollo/client'

const SEARCH_MOVIES = gql`
query SearchMovies ($query: String!) {
  searchMovies(query: $query) {
    id
    name
    score
    releaseDate
  }
}`

export const SearchMovies = (query) => {
  const [getMovies,{error,data,loading}] = useLazyQuery(SEARCH_MOVIES,{
    variables:{query}
  })
  return [getMovies,{error,data,loading}]
}