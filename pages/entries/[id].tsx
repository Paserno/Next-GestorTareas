import { useState, ChangeEvent, useMemo } from 'react';
import { Grid, Card, CardHeader, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, capitalize, IconButton } from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

import { Layout } from "../../components/layouts";
import { EntryStauts } from '../../interfaces';


const validStatus: EntryStauts[] = ['pending', 'in-progress', 'finished'];


const EntryPage = () => {

    const [inputValue, setInputValue] = useState('');
    const [status, setStatus] = useState<EntryStauts>('pending');
    const [touched, setTouched] = useState(false);

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

    const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onStautsChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStauts);
    }

    const onSave = () => {
        console.log({ inputValue, status })
    }

    return (
        <Layout title="... ... ...">
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={`Entrada: ${ inputValue }`}
                            subheader={`Creada hace: ... minutos`}
                        />

                        <CardContent>
                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder='Nueva Entrada'
                                autoFocus
                                multiline
                                label="Nueva Entrada"
                                value={ inputValue }
                                onBlur={ () => setTouched( true )}
                                onChange={ onInputValueChanged }
                                helperText={ isNotValid && 'Ingresar un valor'}
                                error={ isNotValid }
                            />

                            <FormControl
                                fullWidth
                            >
                                <FormLabel>Estado: </FormLabel>
                                <RadioGroup
                                    row
                                    sx={{ display: 'flex', justifyContent: 'space-around' }}
                                    value={ status }
                                    onChange={ onStautsChanged }

                                >
                                    {
                                        validStatus.map((option) => (
                                            <FormControlLabel
                                                key={option}
                                                value={option}
                                                control={<Radio />}
                                                label={capitalize(option)}
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>

                        </CardContent>

                        <CardActions>
                            <Button
                                startIcon={<SaveIcon />}
                                variant='contained'
                                fullWidth
                                onClick={ onSave }
                                disabled={ inputValue.length <= 0  }
                            >
                                Guardar
                            </Button>
                        </CardActions>

                    </Card>

                </Grid>
            </Grid>

            <IconButton sx={{
                position: 'fixed',
                bottom: 30,
                right: 30,
                backgroundColor: 'error.dark',
            }}
            >
                <DeleteIcon />
            </IconButton>

        </Layout>
    )
}


export default EntryPage;