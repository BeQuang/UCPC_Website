import { FETCH_USER_LOGIN_SUCCESS, USER_LOGOUT_SUCCESS } from '../actions/userAction';

const INITIAL_STATE = {
    account: {
        access_token: '',
        username: '',
        role: '',
        email: '',
    },
    isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_USER_LOGIN_SUCCESS:
            console.log(action);
            return {
                ...state,
                account: {
                    access_token: action?.payload?.DT?.access_token,
                    username: action?.payload?.DT?.username,
                    role: action?.payload?.DT?.role,
                    email: action?.payload?.DT?.email,
                },
                isAuthenticated: true,
            };
        case USER_LOGOUT_SUCCESS:
            return {
                ...state,
                account: {
                    access_token: '',
                    username: '',
                    role: '',
                    email: '',
                },
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default userReducer;
