const initialData = {
    tasks: [
        { id: 'task-1', name: 'Lee Pham' },
        { id: 'task-2', name: 'Tuan Pham Le' },
        { id: 'task-3', name: 'Jason' },
        { id: 'task-4', name: 'Ivy Tran' },
        { id: 'task-5', name: 'Loi Pham' },
        { id: 'task-6', name: 'Lam Anh' },
    ],
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Candidates',
            taskIds: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5'],
            isDropDisabled: false
        },
        'column-2': {
            id: 'column-2',
            title: 'Frontend Developer',
            taskIds: [],
            isDropDisabled: false
        },
        'column-3': {
            id: 'column-3',
            title: 'Backend Developer',
            taskIds: [],
            isDropDisabled: false
        },
        'column-4': {
            id: 'column-4',
            title: 'QA Special List',
            taskIds: [],
            isDropDisabled: false
        },

    },
    columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
}

export default initialData;