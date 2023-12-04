const posts = (posts = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_POSTS':
            return {
                ...posts,
                list: action.payload.data,
                postsCount: action.payload.data.length
            };
        // return action.payload;
        case 'CREATE':
            return [...posts, action.payload];
        default:
            return posts;
    }
}

export default posts;
