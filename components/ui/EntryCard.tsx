import { Card, CardActionArea, CardContent, Typography, CardActions } from '@mui/material';
import { Entry } from '../../interfaces';
import { DragEvent, FC, useContext, useState } from 'react';
import { UIContext } from '../../context/ui';

import StickyNote2Icon from '@mui/icons-material/StickyNote2';

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const { startDragging, endDragging } = useContext(UIContext);
    const [isDragging, setIsDragging] = useState(false);

    

    const onDragStart = (event: DragEvent) => {
        event.dataTransfer.setData('text', entry._id);
        // event.dataTransfer.setDragImage(, 0 , 0);
        setIsDragging(true)
        startDragging();
    }

    const onDragEnd = (event: DragEvent) => {
        endDragging();
        setIsDragging(false);
    }


    return (
        <Card
            sx={{ marginBottom: 1 }}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            style={ isDragging ? {opacity: 0, transition: 'all .5s' } : undefined }

        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}>{entry.description}</Typography>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant='body2'>hace 30 minutos</Typography>

                </CardActions>
            </CardActionArea>

        </Card>



    )
}
