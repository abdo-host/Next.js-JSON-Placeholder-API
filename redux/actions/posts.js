import {showLoading, hideLoading} from "react-redux-loading-bar";
import * as api from '../api';

export const getPosts = () => async (dispatch) => {
    try {
        dispatch(showLoading());
        const data = await api.fetchPosts();
        return new Promise((resolve, reject) => {
            resolve(data)
        }).then((response) => {
            dispatch({type: 'FETCH_ALL_POSTS', payload: response});
            setTimeout(() => {
                dispatch(hideLoading());
            }, 500);
        });
    } catch (error) {
        console.error(error.message)
    }
}

export const createPost = (post, callback) => async (dispatch) => {
    try {
        const data = await api.createPost(post);
        dispatch({type: 'CREATE', payload: data});
        callback(data)
    } catch (error) {
        console.error(error)
    }
}
