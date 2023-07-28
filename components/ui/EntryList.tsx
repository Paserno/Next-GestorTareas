import { FC, useContext, useMemo } from 'react';
import { Paper, List } from '@mui/material';
import { EntryStauts } from '../../interfaces';
import { EntryCard } from './EntryCard';
import { EntriesContext } from '../../context/entries';

interface Props {
    status: EntryStauts
}

export const EntryList: FC<Props> = ({ status }) => {

    const { entries } = useContext(EntriesContext);

    const entriesByStatus = useMemo(() => entries.filter(entry => entry.status === status), [entries]);

    return (
        <div>
            <Paper sx={{
                height: 'calc(100vh - 160px)',
                overflow: 'auto',
                backgroundColor: 'transparent',
                padding: '1px 5px',
                '&::-webkit-scrollbar': { display: 'none' }
            }}>
                <List sx={{ opacity: 1 }}>
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
