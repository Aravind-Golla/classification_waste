module.exports = {
  apps: [{
    name: 'waste-classifier-api',
    script: 'app.py',
    interpreter: '/home/ubuntu/classification_waste/backend/venv/bin/python3',
    cwd: '/home/ubuntu/classification_waste/backend',
    instances: 1,
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
