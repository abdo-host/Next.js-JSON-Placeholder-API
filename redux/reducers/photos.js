const photos = (photos = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL_PHOTOS':
            return action.payload;
        default:
            return photos;
    }
}

export default photos;
