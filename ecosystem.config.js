module.exports = {
  apps: [{
    name: 'vocal_codes',
    script: 'server/server.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-3-94-89-241.compute-1.amazonaws.com',
      key: '~/.ssh/vocal_codes.pem',
      ref: 'origin/master',
      repo: 'git@github.com:ArohanD/morse-code-translator.git',
      path: '/home/ubuntu/',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}