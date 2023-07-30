import { useState, ChangeEvent, useMemo, FC, useContext } from 'react';
import { GetServerSideProps } from 'next';

import { Grid, Card, CardHeader, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, capitalize, IconButton } from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

import { dbEntries } from '../../database';
import { Layout } from "../../components/layouts";
import { EntryStauts, Entry } from '../../interfaces';
import { EntriesContext } from '../../context/entries';
import { dateFunctions } from '../../utils';
import { useRouter } from 'next/router';



const validStatus: EntryStauts[] = ['pending', 'in-progress', 'finished'];

interface Props {
    entry: Entry;
}


const EntryPage: FC<Props> = ({ entry }) => {

    const { updateEntry } = useContext(EntriesContext);
    const router = useRouter();


    const [inputValue, setInputValue] = useState(entry.description);
    const [status, setStatus] = useState<EntryStauts>(entry.status);
    const [touched, setTouched] = useState(false);

    const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

    const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    }

    const onStautsChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStauts);
    }

    const onSave = () => {
        if( inputValue.trim().length === 0) return;

        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue
        }

        updateEntry( updatedEntry, true );
        setTimeout(() => {
            router.back();
            
        }, 500);
    }

    return (
        <Layout title={inputValue.substring(0, 20) + '...'}>
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={`Entrada: `}
                            subheader={`Creada hace: ${dateFunctions.getFormatDistanceToNow(entry.createdAt) }`}
                        />

                        <CardContent>
                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder='Nueva Entrada'
                                autoFocus
                                multiline
                                label="Nueva Entrada"
                                value={inputValue}
                                onBlur={() => setTouched(true)}
                                onChange={onInputValueChanged}
                                helperText={isNotValid && 'Ingresar un valor'}
                                error={isNotValid}
                            />

                            <FormControl
                                fullWidth
                            >
                                <FormLabel>Estado: </FormLabel>
                                <RadioGroup
                                    row
                                    sx={{ display: 'flex', justifyContent: 'space-around' }}
                                    value={status}
                                    onChange={onStautsChanged}

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
                                onClick={onSave}
                                disabled={inputValue.length <= 0}
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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params as { id: string };

    const entry = await dbEntries.getEntryById(id)

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }

    return {
        props: {
            entry
        }
    }
}



export default EntryPage;