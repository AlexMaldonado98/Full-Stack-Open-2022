import { gql } from "@apollo/client";

export const DetailsBook = gql`
    fragment DetailsBook on Book{
        title
        author{
          name
        }
        genres
        published
    }
`
