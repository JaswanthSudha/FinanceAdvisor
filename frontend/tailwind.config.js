/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,jsx}'],
	theme: {
		extend: {
			backgroundImage: {
				'login-bg':
					"url('/Users/jaswanthsudha/Desktop/frontend/src/image.png')",
				'register-bg':
					"url('/Users/jaswanthsudha/Desktop/frontend/src/image.png')",
			},
		},
	},
	plugins: [],
};
