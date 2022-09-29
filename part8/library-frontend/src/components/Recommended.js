import { useQuery } from "@apollo/client";
import { ALL_BOOKS, USER } from "../authors/queries";

export const Recommended = ({ show }) => {
    console.log('render');
    const { data } = useQuery(ALL_BOOKS);
    const { data: user } = useQuery(USER);

    const favorite = user?.me?.favoriteGenre
    const books = data?.allBooks
    
    if (!show) {
        return null
    }

    return (
        <div>
            <h2>RECOMMENDATIONS</h2>
            <p>books in your favorite genre is <strong>{favorite}</strong></p>
            <table >
                <tbody>
                    <tr >
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.filter(book => book.genres.includes(favorite)).map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};