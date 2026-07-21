//pm2 deploy ecosystem.config.js production setup
module.exports = {
  apps : [
  {
    "name": "flyer",
    max_memory_restart: "600M",
    "script": "app.js",
    "log_file": "/sites/logs/node_flyer-combined.log",
    "out_file": "/sites/logs/node_flyer-out.log",
    "error_file": "/sites/logs/node_flyer-err.log",
    "args": "-site flyer",
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: "production"
    }
  },
  {
    "name": "lpm",
    max_memory_restart: "600M",
    "script": "app.js",
    "log_file": "/sites/logs/node_lpm-combined.log",
    "out_file": "/sites/logs/node_lpm-out.log",
    "error_file": "/sites/logs/node_lpm-err.log",
    "args": "-site lpm",
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: "production"
    }
  },
  {
    "name": "shockart",
    max_memory_restart: "300M",
    "script": "app.js",
    "log_file": "/sites/logs/node_shockart-combined.log",
    "out_file": "/sites/logs/node_shockart-out.log",
    "error_file": "/sites/logs/node_shockart-err.log",
    "args": "-site shockart",
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: "production"
    }
  },
  {
    "name": "lcf",
    max_memory_restart: "600M",
    "script": "app.js",
    "log_file": "/sites/logs/node_lcf-combined.log",
    "out_file": "/sites/logs/node_lcf-out.log",
    "error_file": "/sites/logs/node_lcf-err.log",
    "args": "-site lcf",
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: "production"
    }
  },
  {
    "name": "linuxclub",
    max_memory_restart: "300M",
    "script": "app.js",
    "log_file": "/sites/logs/node_linuxclub-combined.log",
    "out_file": "/sites/logs/node_linuxclub-out.log",
    "error_file": "/sites/logs/node_linuxclub-err.log",
    "args": "-site linuxclub",
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: "production"
    }
  },
  {
    "name": "chromosphere",
    max_memory_restart: "300M",
    "script": "app.js",
    "log_file": "/sites/logs/node_chromosphere-combined.log",
    "out_file": "/sites/logs/node_chromosphere-out.log",
    "error_file": "/sites/logs/node_chromosphere-err.log",
    "args": "-site chromosphere",
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: "production"
    }
  },
  {
    "name": "digitalatium",
    max_memory_restart: "300M",
    "script": "app.js",
    "log_file": "/sites/logs/node_digitalatium-combined.log",
    "out_file": "/sites/logs/node_digitalatium-out.log",
    "error_file": "/sites/logs/node_digitalatium-err.log",
    "args": "-site digitalatium",
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: "production"
    }
  },
  {
    "name": "visualsound",
    max_memory_restart: "300M",
    "script": "app.js",
    "log_file": "/sites/logs/node_visualsound-combined.log",
    "out_file": "/sites/logs/node_visualsound-out.log",
    "error_file": "/sites/logs/node_visualsound-err.log",
    "args": "-site visualsound",
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: "production"
    }
  },
  {
    "name": "visualsoundacademy",
    max_memory_restart: "300M",
    "script": "app.js",
    "log_file": "/sites/logs/node_visualsoundacademy-combined.log",
    "out_file": "/sites/logs/node_visualsoundacademy-out.log",
    "error_file": "/sites/logs/node_visualsoundacademy-err.log",
    "args": "-site visualsoundacademy",
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: "production"
    }
  },
  {
    "name": "fotonica",
    max_memory_restart: "600M",
    "script": "app.js",
    "log_file": "/sites/logs/node_fotonica-combined.log",
    "out_file": "/sites/logs/node_fotonica-out.log",
    "error_file": "/sites/logs/node_fotonica-err.log",
    "args": "-site fotonica",
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: "production"
    }
  },
{
    "name": "vjtelevision",
    max_memory_restart: "600M",
    "script": "app.js",
    "log_file": "/sites/logs/node_vjtelevision-combined.log",
    "out_file": "/sites/logs/node_vjtelevision-out.log",
    "error_file": "/sites/logs/node_vjtelevision-err.log",
    "args": "-site vjtelevision",
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: "production"
    }
  },
  {
    "name": "wam",
    max_memory_restart: "300M",
    "script": "app.js",
    "log_file": "/sites/logs/node_wam-combined.log",
    "out_file": "/sites/logs/node_wam-out.log",
    "error_file": "/sites/logs/node_wam-err.log",
    "args": "-site wam",
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: "production"
    }
  },
  {
    "name": "flxer",
    max_memory_restart: "600M",
    "script": "app.js",
    "log_file": "/sites/logs/node_flxer-combined.log",
    "out_file": "/sites/logs/node_flxer-out.log",
    "error_file": "/sites/logs/node_flxer-err.log",
    "args": "-site flxer",
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: "production"
    }
  },
  {
    "name": "gianlucadelgobbo",
    max_memory_restart: "300M",
    "script": "app.js",
    "log_file": "/sites/logs/node_gianlucadelgobbo-combined.log",
    "out_file": "/sites/logs/node_gianlucadelgobbo-out.log",
    "error_file": "/sites/logs/node_gianlucadelgobbo-err.log",
    "args": "-site gianlucadelgobbo",
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: "production"
    }
  },
  {
    "name": "pac",
    max_memory_restart: "600M",
    "script": "app.js",
    "log_file": "/sites/logs/node_pac-combined.log",
    "out_file": "/sites/logs/node_pac-out.log",
    "error_file": "/sites/logs/node_pac-err.log",
    "args": "-site pac",
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: "production"
    }
  },
  {
    "name": "electrokids",
    max_memory_restart: "600M",
    "script": "app.js",
    "log_file": "/sites/logs/node_electrokids-combined.log",
    "out_file": "/sites/logs/node_electrokids-out.log",
    "error_file": "/sites/logs/node_electrokids-err.log",
    "args": "-site electrokids",
    time: true,
    instances: 1,
    exec_mode: "fork",
    autorestart: true,
    watch: false,
    env: {
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