import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
  query allAuthors{
    allAuthors {
        name
        born
        bookCount
    }
  }
`

export const USER = gql`
  query{
    me {
      username
      favoriteGenre
    }
  }
`

export const ALL_BOOKS = gql`
  query allbooksT( $genres: String) {
    allBooks(genres: $genres) {
        title
        author{
          name
        }
        genres
        published
    }
  }
`