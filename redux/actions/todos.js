import * as api from '../api';

export const getTodos = (params = '') => async (dispatch) => {
    try {
        const data = await api.fetchTodos(params);
        dispatch({type: 'FETCH_ALL_TODOS', payload: data});
    } catch (error) {
        console.error(error.message)
    }
}
