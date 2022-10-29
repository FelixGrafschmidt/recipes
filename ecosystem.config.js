module.exports = {
	apps: [
		{
			name: "recipes",
			exec_mode: "cluster",
			instances: 1,
			script: "./.output/server/index.mjs",
			env: {
				PORT: 3002,
			},
		},
	],
};
