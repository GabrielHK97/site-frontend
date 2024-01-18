import axios, { type AxiosStatic } from 'axios';

export class DatabaseAxios {
	static getAxios(): AxiosStatic {
		axios.defaults.baseURL = import.meta.env.VITE_API_URL;
		return axios;
	}
}
