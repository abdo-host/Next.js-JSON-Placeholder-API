const todos = (todos = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_TODOS':
            return action.payload;
        default:
            return todos;
    }
}

export default todos;
