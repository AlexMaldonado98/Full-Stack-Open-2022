import { CoursePart } from "../types"
import {Part} from './Part'

export const Content = ( {parts}:{parts:Array<CoursePart>}) => {
    return (
        <>
            {parts.map(part => <Part key={part.name} part={part} />)}
        </>
    )
}