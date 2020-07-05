//pm2 deploy ecosystem.config.js production setup
module.exports = {
  apps : [
  {
    "name": "flyer",
    max_memory_restart: "600M",
    "script": "app.js",
    "log_file": "/var/log/nginx/node_flyer-combined.log",
    "out_file": "/var/log/nginx/node_flyer-out.log",
    "error_file": "/var/log/nginx/node_flyer-err.log",
    "args": "-site flyer",
    ignore_watch: ["public", "locales"],
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: true,
    watch_options: {
      followSymlinks: false
    },
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  },
  {
    "name": "avnode",
    max_memory_restart: "100M",
    "script": "app.js",
    "log_file": "/var/log/nginx/node_avnode-combined.log",
    "out_file": "/var/log/nginx/node_avnode-out.log",
    "error_file": "/var/log/nginx/node_avnode-err.log",
    "args": "-site avnode",
    ignore_watch: ["public", "locales"],
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: true,
    watch_options: {
      followSymlinks: false
    },
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  },
  {
    "name": "lpm",
    max_memory_restart: "600M",
    "script": "app.js",
    "log_file": "/var/log/nginx/node_lpm-combined.log",
    "out_file": "/var/log/nginx/node_lpm-out.log",
    "error_file": "/var/log/nginx/node_lpm-err.log",
    "args": "-site lpm",
    ignore_watch: ["public", "locales"],
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: true,
    watch_options: {
      followSymlinks: false
    },
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  },
  {
    "name": "shockart",
    max_memory_restart: "300M",
    "script": "app.js",
    "log_file": "/var/log/nginx/node_shockart-combined.log",
    "out_file": "/var/log/nginx/node_shockart-out.log",
    "error_file": "/var/log/nginx/node_shockart-err.log",
    "args": "-site shockart",
    ignore_watch: ["public", "locales"],
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: true,
    watch_options: {
      followSymlinks: false
    },
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  },
  {
    "name": "lcf",
    max_memory_restart: "600M",
    "script": "app.js",
    "log_file": "/var/log/nginx/node_lcf-combined.log",
    "out_file": "/var/log/nginx/node_lcf-out.log",
    "error_file": "/var/log/nginx/node_lcf-err.log",
    "args": "-site lcf",
    ignore_watch: ["public", "locales"],
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: true,
    watch_options: {
      followSymlinks: false
    },
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  },
  {
    "name": "linuxclub",
    max_memory_restart: "300M",
    "script": "app.js",
    "log_file": "/var/log/nginx/node_linuxclub-combined.log",
    "out_file": "/var/log/nginx/node_linuxclub-out.log",
    "error_file": "/var/log/nginx/node_linuxclub-err.log",
    "args": "-site linuxclub",
    ignore_watch: ["public", "locales"],
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: true,
    watch_options: {
      followSymlinks: false
    },
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  },
  {
    "name": "chromosphere",
    max_memory_restart: "300M",
    "script": "app.js",
    "log_file": "/var/log/nginx/node_chromosphere-combined.log",
    "out_file": "/var/log/nginx/node_chromosphere-out.log",
    "error_file": "/var/log/nginx/node_chromosphere-err.log",
    "args": "-site chromosphere",
    ignore_watch: ["public", "locales"],
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: true,
    watch_options: {
      followSymlinks: false
    },
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  },
  {
    "name": "fotonica",
    max_memory_restart: "600M",
    "script": "app.js",
    "log_file": "/var/log/nginx/node_fotonica-combined.log",
    "out_file": "/var/log/nginx/node_fotonica-out.log",
    "error_file": "/var/log/nginx/node_fotonica-err.log",
    "args": "-site fotonica",
    ignore_watch: ["public", "locales"],
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: true,
    watch_options: {
      followSymlinks: false
    },
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  },
{
    "name": "vjtelevision",
    max_memory_restart: "600M",
    "script": "app.js",
    "log_file": "/var/log/nginx/node_vjtelevision-combined.log",
    "out_file": "/var/log/nginx/node_vjtelevision-out.log",
    "error_file": "/var/log/nginx/node_vjtelevision-err.log",
    "args": "-site vjtelevision",
    ignore_watch: ["public", "locales"],
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: true,
    watch_options: {
      followSymlinks: false
    },
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  },
  {
    "name": "wam",
    max_memory_restart: "300M",
    "script": "app.js",
    "log_file": "/var/log/nginx/node_wam-combined.log",
    "out_file": "/var/log/nginx/node_wam-out.log",
    "error_file": "/var/log/nginx/node_wam-err.log",
    "args": "-site wam",
    ignore_watch: ["public", "locales"],
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: true,
    watch_options: {
      followSymlinks: false
    },
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  },
  {
    "name": "flxer",
    max_memory_restart: "600M",
    "script": "app.js",
    "log_file": "/var/log/nginx/node_flxer-combined.log",
    "out_file": "/var/log/nginx/node_flxer-out.log",
    "error_file": "/var/log/nginx/node_flxer-err.log",
    "args": "-site flxer",
    ignore_watch: ["public", "locales"],
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: true,
    watch_options: {
      followSymlinks: false
    },
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  },
  {
    "name": "gianlucadelgobbo",
    max_memory_restart: "300M",
    "script": "app.js",
    "log_file": "/var/log/nginx/node_gianlucadelgobbo-combined.log",
    "out_file": "/var/log/nginx/node_gianlucadelgobbo-out.log",
    "error_file": "/var/log/nginx/node_gianlucadelgobbo-err.log",
    "args": "-site gianlucadelgobbo",
    ignore_watch: ["public", "locales"],
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: true,
    watch_options: {
      followSymlinks: false
    },
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  },
  {
    "name": "pac",
    max_memory_restart: "600M",
    "script": "app.js",
    "log_file": "/var/log/nginx/node_pac-combined.log",
    "out_file": "/var/log/nginx/node_pac-out.log",
    "error_file": "/var/log/nginx/node_pac-err.log",
    "args": "-site pac",
    ignore_watch: ["public", "locales"],
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: true,
    watch_options: {
      followSymlinks: false
    },
    env: {
      NODE_ENV: "development"
    },
    env_production: {
      NODE_ENV: "production"
    }
  }
],

  deploy : {
    production : {
      user : "hyo",
      host : [{host : "176.9.142.221",port : "9922"}],
      ref  : "origin/master",
      repo : "git@github.com:gianlucadelgobbo/wp-avnode-nodejs-theme.git",
      path : "",
      "post-deploy" : "npm install && pm2 reload ecosystem.config.js --env production"
    }
  }
};