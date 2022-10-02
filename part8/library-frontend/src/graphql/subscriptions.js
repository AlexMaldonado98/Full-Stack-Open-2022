import { gql } from "@apollo/client"
import {DetailsBook} from './fragments'
export const BOOK_ADDED = gql`
    subscription {
        bookAdded{
            ...DetailsBook
        }
    }
    ${DetailsBook}
`