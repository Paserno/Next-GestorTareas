import { DragEvent, FC, useContext, useMemo } from 'react';
import { Paper, List } from '@mui/material';

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import { EntryStauts } from '../../interfaces';
import { EntryCard } from './EntryCard';

import styles from './EntryList.module.css';

interface Props {
    status: EntryStauts
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries, updateEntry } = useContext(EntriesContext);
    const { isDragging, endDragging } = useContext(UIContext);

    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries]);

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
        const id = event.dataTransfer.getData('text');

        const entry = entries.find( e => e._id === id )!;
        if (!entry) return;
        entry.status = status;
        updateEntry(entry);
        endDragging();
    }

    return (
        <div
            onDrop={onDropEntry}
            onDragOver={allowDrop}
            className={ isDragging ? styles.dragging : ''}
        >
            <Paper sx={{
                height: 'calc(100vh - 160px)',
                overflow: 'auto',
                backgroundColor: 'transparent',
                padding: '1px 5px',
                '&::-webkit-scrollbar': { display: 'none' }
            }}>


                <List sx={{ opacity: isDragging ? 0.3 : 1, transition: 'all .3s', marginBottom: -10 }}>
                    {
                        entriesByStatus.map(entry => (
                            <EntryCard key={entry._id} entry={entry} />
                        ))
                    }
                </List>

            </Paper>
        </div>
    )
}
