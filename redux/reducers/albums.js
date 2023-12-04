const albums = (albums = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_ALBUMS':
            return action.payload;
        default:
            return albums;
    }
}

export default albums;
