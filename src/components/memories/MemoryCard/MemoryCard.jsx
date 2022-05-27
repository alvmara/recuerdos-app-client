import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Box, Button, TextField } from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';

import CommentsList from './CommentsList';
import MemoryImagesCarousel from './MemoryImagesCarousel';
import { createComment } from '../../../api/memories';
import { createLike, deleteLike } from '../../../api/memoryUserLikes';

// interface ExpandMoreProps extends IconButtonProps {
//     expand: boolean;
// }

export default function MemoryCard({
    _id,
    title,
    description,
    ownerName,
    ownerId,
    images,
    date,
    comments,

    updateMemory
}) {
    const isMemoryLiked = useSelector(state => state.userLikes.memoriesLiked.includes(_id));
    const token = useSelector(state => state.credentials.accessToken);
    const isLoggedIn = token !== null;

    const [expanded, setExpanded] = React.useState(false);
    const [comment, setComment] = React.useState('');

    const dispatch = useDispatch();

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const toggleLikeMemory = () => {
        const promise = isMemoryLiked ? deleteLike(_id, { token }) : createLike(_id, { token });

        promise.then(() => {
            dispatch({ type: 'TOGGLE_MEMORY_LIKE', memoryId: _id });
        })
    }

    const postComment = (e) => {
        e.preventDefault();

        createComment(_id, comment, { token })
            .then((memoryChanges) => updateMemory(_id, memoryChanges))
            .then(() => setComment(''));
    }

    return (
        <Card sx={{ maxWidth: '100%' }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {ownerName.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={title}
                subheader={date.toLocaleString()}
            />

            <Box>
                <MemoryImagesCarousel images={images} />
            </Box>

            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>

            <CardActions disableSpacing>
                {isLoggedIn &&
                    <IconButton
                        onClick={toggleLikeMemory}
                        sx={{ color: isMemoryLiked ? red['400'] : '' }}
                        aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                }

                <Box sx={{ flexGrow: 1 }}></Box>

                <Button disabled={comments.length === 0} onClick={() => handleExpandClick()}>
                    Ver comentarios
                </Button>
            </CardActions>


            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <CommentsList comments={comments} />
                </CardContent>
            </Collapse>

            <Box component="form" onSubmit={(e) => postComment(e)} sx={{ paddingInline: '20px', paddingBottom: '8px' }}>
                <TextField value={comment} onChange={(e) => setComment(e.target.value)} id="standard-basic" label="Escribe tu comentario" variant="standard" sx={{ width: '100%' }} />
            </Box>
        </Card >
    );
}