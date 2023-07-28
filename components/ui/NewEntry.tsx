import { Button, Box, TextField } from '@mui/material';

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';


export const NewEntry = () => {
    return (
        <Box sx={{ marginBottom: 2, paddingX: 2}}>

            <Button 
                startIcon={<AddCircleOutlineOutlinedIcon />}
                fullWidth
                variant='outlined'
                // size='large'
            >
                Agregar Tarea
            </Button>


            <TextField 
                fullWidth
                sx={{ marginTop: 2, marginBottom: 1}}
                placeholder='Nueva Entrada'
                autoFocus
                multiline
                label='Nueva Entrada'
                helperText='Ingrese un valor'
            />

            <Box display='flex' justifyContent={'space-between'}>
                <Button
                    variant='text'
                    color='error'
                >
                    Cancelar
                </Button>
                <Button
                    variant='outlined'
                    color='info'
                    endIcon={<SaveOutlinedIcon />}

                >
                    Guardar
                </Button>

            </Box>

        </Box>
    )
}
