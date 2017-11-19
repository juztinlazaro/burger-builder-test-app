import { 
	AUTH_START, 
	AUTH_SUCCESS, 
	AUTH_FAIL,
	AUTH_LOGOUT,
	SET_AUTH_REDIRECT_PATH
} from './actionTypes';
import axios from 'axios';

export const authStart = () => {
	return {
		type: AUTH_START
	}
};

export const authSuccess = (token, userId) => {
	return {
		type: AUTH_SUCCESS,
		token,
		userId
	}
};

export const authFail = (error) => {
	return {
		type: AUTH_FAIL,
		error
	}
};

export const logout = () => {
	localStorage.removeItem('token');
	localStorage.removeItem('expirationDate');
	localStorage.removeItem('userId');

	return {
		type: AUTH_LOGOUT
	}
}

export const checkAuthTimeout = (expirationTime) => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	}
};

export const auth = (email, password, isSignup) => {
	return dispatch => {
		dispatch(authStart());
		const authData = {
			email,
			password,
			returnSecureToken: true
		};
		const API_KEY = 'AIzaSyBYtmBI3N5301vshpZAeoIBqQCBd0MYhec';
		let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=';
		
		if(!isSignup) {
			url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=';
		}

		axios.post(`${url}${API_KEY}`, authData)
		.then((res) => {

			const token = res.data.idToken;
			const userId = res.data.localId;
			const expiresIn = res.data.expiresIn;
			const expirationDate = new Date( new Date().getTime() + expiresIn * 1000 );

			localStorage.setItem('token', token);
			localStorage.setItem('userId', userId);
			localStorage.setItem('expirationDate', expirationDate);

			dispatch(authSuccess(token, userId));
			dispatch(checkAuthTimeout(expiresIn));
		})
		.catch((error) => {
			const err = error.response.data.error;
			dispatch(authFail(err));
		})
	}
};

export const setAuthRedirectPath = (path) => {
	return {
		type: SET_AUTH_REDIRECT_PATH,
		path
	}
};

export const authCheckState = () => {
	return dispatch => {
		const token = localStorage.getItem('token');
		const userId = localStorage.getItem('userId');

		if(!token) {
			dispatch( logout() );
		} else {
			const expirationDate = new Date( localStorage.getItem('expirationDate') );

			if(expirationDate <= new Date()) {
				dispatch( logout() );
			} else {
				dispatch( authSuccess(token, userId) );

				dispatch( checkAuthTimeout( (expirationDate.getTime() - new Date().getTime()) / 1000 ));
			}
		}
	};
}
