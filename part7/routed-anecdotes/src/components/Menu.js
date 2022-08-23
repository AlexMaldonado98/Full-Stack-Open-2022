import {Link} from 'react-router-dom';

const Menu = () => {
    const padding = {
        paddingRight: 5
    }
    return (
        <div>
            <Link to='/' style={padding}>anecdotes</Link>
            <Link to='/about' style={padding}>about</Link>
            <Link to='/create' style={padding}>create new</Link>
        </div>
    )
}

export default Menu;