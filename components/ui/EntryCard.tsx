import { Card, CardActionArea, CardContent, Typography, CardActions } from '@mui/material';
import { Entry } from '../../interfaces';
import { DragEvent, FC } from 'react';

interface Props {
    entry: Entry;
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const onDragStart = (event: DragEvent) => {
        event.dataTransfer.setData('text', entry._id);

        // TODO: Modificar el estado, para indicar que estoy haciendo drag
    }

    const onDragEnd = (event: DragEvent) => {
        // TODO: Cancelar ondrag
    }


    return (
        <Card
            sx={{ marginBottom: 1 }}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}

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
