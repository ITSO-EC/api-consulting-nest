module.exports = {
    apps: [
      {
        name: 'API CONSULTING NEST',
        script: './dist/main.js',
        autorestart: true,
        watch: false,
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  