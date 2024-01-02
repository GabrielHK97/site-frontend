import axios from 'axios';

export class Session {
	static setToken(token: string): void {
		localStorage.setItem('token', token);
	}

	static destroyToken() {
		localStorage.removeItem('token');
	}

	static async validate(): Promise<boolean> {
		axios.defaults.baseURL = `http://${import.meta.env.VITE_API_URL}`;
		return axios
			.get('/auth', {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
			})
			.then(() => {
				return true;
			})
			.catch(() => {
				return false;
			});
	}
}