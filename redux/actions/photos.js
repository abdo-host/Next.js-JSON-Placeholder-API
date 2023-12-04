import * as api from '../api';

export const getPhotos = () => async (dispatch) => {
    try {
        const data = await api.fetchPhotos();
        dispatch({type: 'FETCH_ALL_PHOTOS', payload: data});
    } catch (error) {
        console.error(error.message)
    }
}
