import { gql } from "@apollo/client";

export const DetailsBook = gql`
    fragment DetailsBook on Book{
        id
        title
        author{
          name
        }
        genres
        published
        
    }
`
