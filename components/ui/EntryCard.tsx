import { Card, CardActionArea, CardContent, Typography, CardActions } from '@mui/material';
import { Entry } from '../../interfaces';
import { DragEvent, FC, useContext, useState } from 'react';
import { UIContext } from '../../context/ui';

import { useRouter } from 'next/router'

import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import { dateFunctions } from '../../utils';

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const { startDragging, endDragging } = useContext(UIContext);
    const [isDragging, setIsDragging] = useState(false);
    const router = useRouter();

    

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

    const onClick = () => {
        router.push(`/entries/${entry._id}`)
    }


    return (
        <Card
            onClick={ onClick }
            sx={{ marginBottom: 1 }}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            style={ isDragging ? {opacity: 0, transition: 'all .5s' } : undefined }

        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line', wordWrap: 'break-word'  }}>{entry.description}</Typography>
                </CardContent>

                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
                    <Typography variant='body2'>{ dateFunctions.getFormatDistanceToNow(entry.createdAt)}</Typography>

                </CardActions>
            </CardActionArea>

        </Card>



    )
}
