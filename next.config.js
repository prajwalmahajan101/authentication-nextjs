/** @type {import('next').NextConfig} */

let env = {};

try {
	env = require("./env");
} catch (err) {
	console.log(err);
}

const nextConfig = {
	reactStrictMode: true,
	env: {
		...env,
	},
};

module.exports = nextConfig;
