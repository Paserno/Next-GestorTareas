import { FC, PropsWithChildren, useReducer, useEffect } from 'react';

import { useSnackbar } from 'notistack';

import { entriesApi } from '../../apis';
import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [],
}


export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
    const { enqueueSnackbar } = useSnackbar();

    const addNewEntry = async (description: string) => {

        const { data } = await entriesApi.post<Entry>('/entries', { description });
        dispatch({ type: '[Entry] - Add-Entry', payload: data });

    }

    const updateEntry = async ({ _id, description, status }: Entry, showSnackbar: boolean = false) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status });
            dispatch({ type: '[Entry] - Update-Entry', payload: data });

            if (showSnackbar) {
                enqueueSnackbar('Entrada Actualizada', {
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right'
                    }
                })
            }
        } catch (error) {
            console.log({ error });
        }
    }

    const refreshEntry = async () => {
        const { data } = await entriesApi.get<Entry[]>('/entries');

        dispatch({ type: '[Entry] - Refresh-Data', payload: data });
    }

    useEffect(() => {
        refreshEntry()
    }, [])

    const deleteEntry = async ({ _id }: Entry) => {
        try {
            const { data } = await entriesApi.delete<Entry>(`/entries/${_id}`);
            dispatch({ type: '[Entry] - Delete-Data', payload: data});

            enqueueSnackbar('Entrada Borrada', {
                variant: 'success',
                autoHideDuration: 1500,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })

        } catch (error) {
            console.log({ error });
        }

    }


    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            updateEntry,
            deleteEntry,
        }}>
            {children}
        </EntriesContext.Provider>
    )
};