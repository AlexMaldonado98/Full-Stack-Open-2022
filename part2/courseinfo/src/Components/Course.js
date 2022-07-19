const Part = ({ part }) => <p>{part.name} {part.exercises}</p>;

const Header = ({ name }) => <h1>{name}</h1>

const Content = ({ parts }) => {
    return parts.map((part) => <Part key={part.id} part={part} />);
}

const Total = ({ parts }) => {
    const total = parts.reduce((s, q) => {
        return s + q.exercises
    }, 0);

    return <h3>Total of {total} exercises</h3>
}

export const Course = ({ course }) => (
    <>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </>
);