import { CoursePart } from "../types";

export const Part = ({ part }: { part: CoursePart }) => {

    const assertNever = (value: never): never => {
        throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
    };

    switch (part.type) {
        case 'normal':
            return (
                <div>
                    <p><strong>{part.name}:</strong>{part.exerciseCount}</p>
                    <p>{part.description}</p>
                </div>
            )
        case 'groupProject':
            return (
                <div>
                    <p><strong>{part.name}: </strong>{part.exerciseCount}</p>
                    <p>project exercises {part.groupProjectCount}</p>
                </div>
            )
        case 'submission':
            return (
                <div>
                    <p><strong>{part.name}: </strong>{part.exerciseCount}</p>
                    <p>{part.description}</p>
                    <p>{part.exerciseSubmissionLink}</p>
                </div>
            )
        case 'special':
            return (
                <div>
                    <p><strong>{part.name}: </strong>{part.exerciseCount}</p>
                    <p>{part.description}</p>
                    <p>required skils: {part.requirements.join(', ')}</p>
                </div>
            )
        default:
            assertNever(part)
            break;
    }
    return (
        <></>
    )
}