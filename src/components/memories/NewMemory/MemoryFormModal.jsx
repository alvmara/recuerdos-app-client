import { Send } from '@mui/icons-material';
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Modal, TextField } from '@mui/material'
import { red } from '@mui/material/colors';
import React, { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone';
import { createMemory, uploadImages } from '../../../api/memories';
import MemoryImagesCarousel from '../MemoryCard/MemoryImagesCarousel';
import { style, styleDropzone } from './styles';
import { useSelector } from 'react-redux';

function MemoryFormModal({ open, onClose, addMemory }) {
    const token = useSelector(state => state.credentials.accessToken);
    const user = useSelector(state => state.credentials.user);

    const { userName = '' } = user || {};

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({ accept: { 'image/*': [] } });


    const [images, setImages] = React.useState([]);
    const [memory, setMemory] = React.useState({ title: '', description: '' });

    const updateMemory = useCallback((prop, value) => setMemory({ ...memory, [prop]: value }), [setMemory, memory]);

    useEffect(() => {
        if (acceptedFiles.length === 0) return;

        uploadImages(acceptedFiles, { token }).then(imageUrls => {
            setImages(imageUrls || []);
            updateMemory('images', imageUrls);
        });
    }, [acceptedFiles, token]);

    const persistMemory = () => {
        createMemory(memory, { token })
            .then(memory => addMemory(memory))
            .then(() => {
                setImages([]);
                setMemory({});
            });
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                component="form"
                sx={{ ...style, gap: '20px', display: 'flex', flexDirection: 'column', margin: '0px', padding: '0px' }}
                noValidate
                autoComplete="off"
            >

                <Card sx={{ maxWidth: 'max(30vw, 300px)', overflowY: 'scroll', padding: '8px' }}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        }
                        title={
                            <TextField
                                required
                                id="new-memory-title"
                                label="Title"
                                fullWidth
                                variant="standard"
                                value={memory.title}
                                onChange={e => updateMemory('title', e.target.value)}
                            />
                        }
                        subheader={new Date().toLocaleString()}
                    />

                    <Box>
                        <div {...getRootProps({ style: styleDropzone({ isDragAccept, isDragReject, isFocused }) })}>
                            <input {...getInputProps()} />
                            <p>Drag 'n' drop some files here, or click to select files</p>

                        </div>
                    </Box>

                    <Box>
                        <MemoryImagesCarousel images={images} />
                    </Box>

                    <CardContent>
                        <TextField
                            id="new-memory-description"
                            label="Description"
                            multiline
                            fullWidth
                            rows={4}
                            variant="standard"
                            value={memory.description}
                            onChange={e => updateMemory('description', e.target.value)}
                        />
                    </CardContent>

                    <CardActions>
                        <Button onClick={() => persistMemory()} endIcon={<Send />} variant="contained" disableElevation>
                            Crear
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Modal >
    )
}

export default MemoryFormModal