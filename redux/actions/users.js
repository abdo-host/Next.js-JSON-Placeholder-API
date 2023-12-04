import * as api from '../api';

export const getUsers = () => async (dispatch) => {
    try {
        const data = await api.fetchUsers();
        dispatch({type: 'FETCH_ALL_USERS', payload: data});
    } catch (error) {
        console.error(error.message)
    }
}
