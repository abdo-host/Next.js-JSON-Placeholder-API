const comments = (comments = [], action) => {
    switch (action.type) {
        case 'ALL_COMMENTS':
            return action.payload;
        default:
            return comments;
    }
}

export default comments;
