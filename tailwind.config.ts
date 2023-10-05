/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
	theme: {
		colors: {
			background: '#f2f2f2',
			accent: '#11da33',
		},
		fontFamily: {
			sans: ['Inter_400Regular', 'sans-serif'],
			'sans-bold': ['Inter_700Bold', 'sans-serif'],
			display: ['Syne_400Regular', 'sans-serif'],
			'display-bold': ['Syne_700Bold', 'sans-serif'],
		},
		extend: {
			spacing: {
				'8xl': '96rem',
				'9xl': '128rem',
			},
			borderRadius: {
				'4xl': '2rem',
			},
		},
	},
};
