module.exports = {
  apps : [{
    script: 'index.js',
    watch: '.'
  },{
      "name": "stelliform-dev",
      "script": "C:\\Program Files\\nodejs\\node_modules\\npm\\bin\\npm-cli.js",
      "args": "run dev",
      "exec_mode": "cluster",
      "cwd": "C:\\dev\\stelliformdigital",
      "env": {
        "NODE_ENV": "development"
      }
 }, 
  

  ],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};
