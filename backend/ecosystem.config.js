module.exports = {
  apps: [{
    name: 'waste-classifier-api',
    script: './venv/bin/gunicorn',
    args: '-w 4 -b 0.0.0.0:5000 app:app',
    cwd: '/home/ubuntu/classification_waste/backend',
    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      PORT: 5000,
      FLASK_DEBUG: 'False'
    },
    error_file: './logs/error.log',
    out_file: './logs/out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true
  }]
};
