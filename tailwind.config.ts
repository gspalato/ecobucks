/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
	theme: {
		colors: {
			background: '#f5f5f5',
			accent: '#11da33',
		},
		fontFamily: {
			sans: ['Inter_400Regular', 'sans-serif'],
			'sans-bold': ['Inter_700Bold', 'sans-serif'],
			display: ['Syne_400Regular', 'sans-serif'],
			'display-bold': ['Syne_700Bold', 'sans-serif'],
		},
	},
};
