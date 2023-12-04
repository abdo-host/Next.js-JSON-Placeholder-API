import * as api from '../api';

export const googleGetUserInfo = (access_token) => async (dispatch) => {
    try {
        const data = (access_token) ? await api.googleAuthUserInfo(access_token) : {};
        dispatch({type: 'GOOGLE_GET_USERINFO', payload: data});
    } catch (error) {
        console.error(error.message)
    }
}
