import { useState, ChangeEvent, useContext } from 'react';
import { Button, Box, TextField } from '@mui/material';

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { EntriesContext } from '../../context/entries';


export const NewEntry = () => {

    const [isAdding, setIsAdding] = useState(false);

    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);

    const { addNewEntry } = useContext(EntriesContext);

    const onTextFieldChanges = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onSave = () => {
        if (inputValue.length === 0) return;

        addNewEntry(inputValue);
        setInputValue('');
        setIsAdding(false);
        setTouched(false);
    }


    return (
        <Box sx={{ marginBottom: 2, paddingX: 2 }}>

            {
                isAdding ? (
                    <>

                        <TextField
                            fullWidth
                            sx={{ marginTop: 2, marginBottom: 1 }}
                            placeholder='Nueva Entrada'
                            autoFocus
                            multiline
                            label='Nueva Entrada'
                            helperText={inputValue.length <= 0 && touched && 'Ingrese un valor'}
                            error={inputValue.length <= 0 && touched}
                            value={inputValue}
                            onChange={onTextFieldChanges}
                            onBlur={() => setTouched(true)}
                        />

                        <Box display='flex' justifyContent={'space-between'}>
                            <Button
                                variant='text'
                                color='error'
                                onClick={() => setIsAdding(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant='outlined'
                                color='info'
                                endIcon={<SaveOutlinedIcon />}
                                onClick={onSave}
                            >
                                Guardar
                            </Button>

                        </Box>
                    </>
                )
                    : (
                        <Button
                            startIcon={<AddCircleOutlineOutlinedIcon />}
                            fullWidth
                            variant='outlined'
                            onClick={() => setIsAdding(true)}
                        >
                            Agregar Tarea
                        </Button>
                    )
            }
        </Box>
    )
}
