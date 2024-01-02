/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#d946ef',
					secondary: '#2dd4bf',
					accent: '#fde047',
					neutral: '#e7e5e4',
					'base-100': '#4b5563',
					info: '#06b6d4',
					success: '#22c55e',
					warning: '#f59e0b',
					error: '#ef4444'
				}
			}
		]
	},
	plugins: [require('daisyui')]
};
