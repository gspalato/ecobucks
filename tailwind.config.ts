/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
	theme: {
		colors: {
			accent: "#11da33"
		},
		fontFamily: {
			sans: ['Inter', 'sans-serif'],
            'sans-bold': ['Inter Bold', 'sans-serif'],
            display: ['Space Grotesk', 'sans-serif'],
            'display-bold': ['Space Grotesk Bold', 'sans-serif'],
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
