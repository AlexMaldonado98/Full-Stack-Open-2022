export type Part = {
    name: string
    exerciseCount: number
}

export interface ContentProps {
    parts: Array<Part>
}

export const Content = (props: ContentProps) => {
    return (
        <>
            {props.parts.map((part) => <p key={part.name}>{part.name} {part.exerciseCount}</p>)}
        </>
    )
}