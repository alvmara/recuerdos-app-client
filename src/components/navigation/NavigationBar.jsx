import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { AddCircle } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { search } from '../../api/memories';
import { useDebounce } from 'usehooks-ts';
import { useDispatch } from 'react-redux';
import { Button } from '@mui/material';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));


// El componente NavigationBar es una barra de navegación que se muestra en todas las páginas
export default function PrimarySearchAppBar({ onClickCreate }) {
    const isLoggedIn = useSelector(state => state.credentials.accessToken !== null);
    const token = useSelector(state => state.credentials.accessToken);
    const [searchText, setSearchText] = React.useState('');
    const searchTextDebounced = useDebounce(searchText, 500);
    const dispatch = useDispatch();

    const logout = () => dispatch({ type: 'LOGOUT' });

    React.useEffect(() => {
        if (searchText === '') {
            dispatch({ type: 'SET_SEARCHED_MEMORIES', memories: null })
            return;
        }

        console.log('searching');

        search({ searchText }, { token })
            .then(memories => dispatch({ type: 'SET_SEARCHED_MEMORIES', memories }))
    }, [searchTextDebounced]);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    {
                        isLoggedIn && <IconButton onClick={() => onClickCreate()}>
                            <AddCircle />
                        </IconButton>

                    }

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                    >
                        Recuerdos App
                    </Typography>

                    <Search value={searchText} onChange={(e) => setSearchText(e.target.value)} >
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                    <Box sx={{ flexGrow: 1 }} />

                    {isLoggedIn && <Button variant='outlined' color='error' onClick={logout}>Logout</Button>}
                </Toolbar>
            </AppBar>
        </Box>
    );
}