import axios from 'axios';
import Cookie from 'js-cookie';

export class Session {

	static async validate(): Promise<boolean> {
		axios.defaults.baseURL = `${import.meta.env.VITE_API_URL}`;
		return axios
			.get('/auth', { withCredentials: true })
			.then(() => {
				return true;
			})
			.catch((e) => {
				console.log(e);
				return false;
			});
	}
}
