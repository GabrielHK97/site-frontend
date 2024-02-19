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
					primary: '#3b82f6',
					secondary: '#a855f7',
					accent: '#ec4899',
					neutral: '#e5e7eb',
					'base-100': '#1e2b30',
					info: '#22d3ee',
					success: '#22c55e',
					warning: '#fbbf24',
					error: '#ef4444'
				}
			}
		]
	},
	plugins: [require('daisyui')]
};
