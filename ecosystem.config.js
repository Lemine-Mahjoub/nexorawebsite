module.exports = {
  apps: [
    {
      name: "nexora-agency",
      script: "pnpm",
      args: "run start",
      cwd: "/home/ubuntu/nexorawebsite",
      env: {
        NODE_ENV: "production",
        PORT: 3010,
      },
      watch: false,
      autorestart: true,
      max_memory_restart: "512M",
      out_file: "~/.pm2/logs/nexora-agency-out.log",
      error_file: "~/.pm2/logs/nexora-agency-error.log",
    },
  ],
};
