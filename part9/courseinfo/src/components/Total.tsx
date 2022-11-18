import { ContentProps } from "./Content";

export const Total = (props:ContentProps) => {
    return(
        <p>
            Number of exercises: {props.parts.reduce((carry,part) => carry + part.exerciseCount,0)}
        </p>
    )
}