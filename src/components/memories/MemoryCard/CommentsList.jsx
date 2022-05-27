import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

export default function AlignItemsList({ comments }) {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {comments.map(({
                _id,
                ownerName,
                comment,
                date,
            }, index) => <>
                    <ListItem key={_id} alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt={ownerName} >{ownerName.charAt(0).toUpperCase()}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {ownerName}
                                    </Typography>

                                    <Typography>
                                        {comment}
                                    </Typography>
                                </React.Fragment>
                            }
                        />
                    </ListItem>

                    {index <= comments.length - 1 && <Divider variant="inset" component="li" />}
                </>)}
        </List>
    );
}