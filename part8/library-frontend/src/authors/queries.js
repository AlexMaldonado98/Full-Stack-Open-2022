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

export const ALL_BOOKS = gql`
  query {
    allBooks {
        title
        author{
          name
        }
        genres
        published
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