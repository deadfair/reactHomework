import {gql, useLazyQuery} from '@apollo/client'

const SEARCH_RELATED_MOVIES = gql`
query SearchMoviesByID($id: ID!) {
  movie(id: $id) {
    id
    name
    score
    releaseDate
    similar{
      id
      name
      score
      releaseDate
    }
  }
}`


export const SearchRelatedMovies = (id) => {
  const [getRelatedMovies,{error,data,loading}] = useLazyQuery(SEARCH_RELATED_MOVIES,{
    variables:{id}
  })
  return [getRelatedMovies,{error,data,loading}]
}