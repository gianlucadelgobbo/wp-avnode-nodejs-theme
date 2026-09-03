//pm2 deploy ecosystem.config.js production setup
module.exports = {
  apps: [
    {
      name: "avnode-single",
      max_memory_restart: "1G",
      script: "app.js",
      log_file: "/sites/logs/node_avnode-single-combined.log",
      out_file: "/sites/logs/node_avnode-single-out.log",
      error_file: "/sites/logs/node_avnode-single-err.log",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
        PORT: "3100"
      }
    }
  ],

  deploy: {
    production: {
      user: "hyo",
      host: [{ host: "176.9.142.219", port: "22" }],
      ref: "origin/master",
      repo: "git@github.com:gianlucadelgobbo/wp-avnode-nodejs-theme.git",
      path: "/sites/wp-avnode-nodejs-theme",
      "post-deploy": "npm install && pm2 reload ecosystem.config.js --env production"
    }
  }
};
