import * as api from '../api';

export const getComments = () => async (dispatch) => {
    try {
        const data = await api.fetchComments();
        dispatch({type: 'ALL_COMMENTS', payload: data});
    } catch (error) {
        console.error(error.message)
    }
}
