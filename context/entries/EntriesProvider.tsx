import { FC, PropsWithChildren, useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid'

import { Entry } from '../../interfaces';
import { EntriesContext, entriesReducer } from './';

export interface EntriesState {
    entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
    entries: [
        {
            _id: uuidv4(),
            description: 'Duis aute ad ullamco cillum veniam est esse in esse duis incididunt.',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            _id: uuidv4(),
            description: 'Pariatur ipsum consectetur velit voluptate officia sit veniam ex proident.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000
        },
        {
            _id: uuidv4(),
            description: 'Ut tempor cillum velit fugiat ad nisi duis deserunt sint ut et.',
            status: 'finished',
            createdAt: Date.now() - 100000
        },
    ],
}


export const EntriesProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE)

    return (
        <EntriesContext.Provider value={{
            ...state,
        }}>
            {children}
        </EntriesContext.Provider>
    )
};