import * as React from 'react';
import Grid from '@mui/material/Grid';

import MemoryCard from '../../components/memories/MemoryCard/MemoryCard';
import WelcomeModal from '../../components/navigation/WelcomeModal';

import { Box, Typography } from '@mui/material';
import { listMemories } from '../../api/memories';

import { useSelector, useDispatch } from "react-redux";
import NoData from '../../components/ui/NoData';

export default function BasicGrid({ theme }) {
    const memories = useSelector(({ memories: { memories, searchedMemories } }) =>
        searchedMemories !== null ? searchedMemories : memories
    );

    const noData = useSelector((state) =>
        state.memories.searchedMemories !== null &&
        state.memories.searchedMemories.length === 0);

    const dispatch = useDispatch();

    const updateMemory = (id, changes) => {
        const foundMemory = memories.find(memory => memory._id === id);
        const updatedMemory = { ...foundMemory, ...changes };

        const index = memories.findIndex(memory => memory._id === id);

        const updatedMemories = memories.slice();

        updatedMemories.splice(index, 1, updatedMemory);

        dispatch({
            type: 'SET_MEMORIES',
            memories: updatedMemories
        });
    }

    React.useEffect(() => {
        listMemories()
            .then((memories) => dispatch({ type: 'SET_MEMORIES', memories }))
            .catch(console.error);
    }, [dispatch]);

    if (noData) {
        return (
            <Box sx={{ textAlign: 'center', padding: '1.4rem' }}>
                <Typography variant='h4'>
                    No hay recuerdos para mostrar
                </Typography>

                <Box>
                    <NoData />
                </Box>
            </Box>
        )
    }

    return (
        <Box sx={{ paddingTop: '20px' }}>
            <Grid container spacing={2}>
                {memories.map((memory) =>
                    <Grid key={memory._id} item xs={12} md={4}>
                        <MemoryCard {...memory} updateMemory={updateMemory} />
                    </Grid>
                )}
            </Grid>

            <WelcomeModal />
        </Box>
    );
}
