import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutSesion } from '../reducer/loginReducer';
import { AppBar, IconButton, Button, Toolbar, Box, MenuItem, Menu as MenuM } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdbIcon from '@mui/icons-material/Adb';

const pages = [{ text: 'BLOGS', rute: '/' }, { text: 'USERS', rute: '/users' }];

export const Menu = () => {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        console.log(event.currentTarget);
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const dispatch = useDispatch();
    const user = useSelector(state => state.login);
    const navigate = useNavigate();

    const handleLogout = (event) => {
        event.preventDefault();
        window.localStorage.removeItem('userCredentials');
        dispatch(logoutSesion());
        navigate('/');
    };

    return (
        <>
            <AppBar position='static'>
                <Toolbar variant='dense' style={{ justifyContent: 'space-between', }} >
                    <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <MenuM
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' }
                            }}


                        >
                            {pages.map((page) => (
                                <MenuItem style={{ backgroundColor:'#ddd', margin:'5px',borderRadius:'10px' }} key={page.text} onClick={handleCloseNavMenu} >
                                    <Button color='inherit' variant='text' component={Link} to={page.rute} >
                                        {page.text}
                                    </Button>
                                </MenuItem>
                            ))}
                        </MenuM>
                    </Box>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <AdbIcon sx={{ display: { xs: 'none', sm: 'flex' }, mr: 1 }} />
                        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                            <Button color='inherit' variant='text' component={Link} to='/' >
                                Blogs
                            </Button>
                            <Button color='inherit' component={Link} to='/users' >Users
                            </Button>
                        </Box>
                    </div>
                    <span style={{ flecGrow: '0.5' }} >{`${user.username} Logged in`}</span>
                    <div >
                        <Button color='inherit' onClick={handleLogout}>logout
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </>
    );
};