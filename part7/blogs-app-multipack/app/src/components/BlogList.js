import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export const BlogList = () => {
    const blogs = useSelector(state => state.blogs);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableBody  >
                    {
                        [...blogs].sort((a, b) => {
                            return b.likes - a.likes;
                        }).map(blog => (
                            <TableRow  sx={{ alignContent: 'center' }} key={blog.id}>
                                <TableCell sx={{ border: '1px #ddd solid', textAlign: 'center' }} className='container-blog'>
                                    <Link to={`/blogs/${blog.id}`} >{`${blog.title}  ${blog.author}`}</Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};