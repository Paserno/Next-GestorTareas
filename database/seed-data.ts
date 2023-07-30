
interface SeedData {
    entries: SeedEntry[];
}


interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}




export const seedData: SeedData = {
    entries: [
        {
            description: 'Pending: Duis aute ad ullamco cillum veniam est esse in esse duis incididunt.',
            status: 'pending',
            createdAt: Date.now()
        },
        {
            description: 'In-progress: Pariatur ipsum consectetur velit voluptate officia sit veniam ex proident.',
            status: 'in-progress',
            createdAt: Date.now() - 1000000
        },
        {
            description: 'Finished: Ut tempor cillum velit fugiat ad nisi duis deserunt sint ut et.',
            status: 'finished',
            createdAt: Date.now() - 100000
        },
    ]
}