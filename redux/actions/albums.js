import * as api from '../api';
import {hideLoading} from "react-redux-loading-bar";

export const getAlbums = () => async (dispatch) => {
    try {
        const data = await api.fetchAlbums();
        return new Promise((resolve, reject) => {
            resolve(data)
        }).then((response) => {
            dispatch({type: 'FETCH_ALL_ALBUMS', payload: response});
            setTimeout(() => {
                dispatch(hideLoading());
            }, 500);
        });
    } catch (error) {
        console.error(error.message)
    }
}
