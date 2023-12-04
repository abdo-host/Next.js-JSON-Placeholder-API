const googleUserInfo = (userInfo = {}, action) => {
    switch (action.type) {
        case 'GOOGLE_GET_USERINFO':
            return action.payload;
        default:
            return userInfo;
    }
}

export default googleUserInfo;
