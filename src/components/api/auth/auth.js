import API from '../../api';

export async function getAuthentication(username, password) {
	let userparam = { 'email': username, 'password': password };
	return new API().getHttpClient('http://visa.enverhq.com').post('/login', userparam)
		.then(res => {localStorage.setItem('token', res.data.token); console.log(res.data.token)})
		.catch(error => {
			throw error;
		});
};