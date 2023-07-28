

export interface Entry {
    _id: string;
    description: string;
    createdAt: number;
    status: EntryStauts;
}

export type EntryStauts = 'pending' | 'in-progress' | 'finished'