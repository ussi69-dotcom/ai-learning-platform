#!/bin/bash

# Security Setup Script for Ubuntu VPS
# Run as root

echo "🔒 Starting Security Hardening..."

# 1. Update System
apt update && apt upgrade -y

# 2. Install Fail2Ban
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# 3. Configure UFW (Firewall)
# Allow SSH (22), HTTP (80), HTTPS (443), and backend dev port (8000) if needed, but usually proxied via 80/443
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https
# ufw allow 8000/tcp # Uncomment if you expose FastAPI directly without Nginx proxy
ufw --force enable

# 4. Secure Shared Memory (prevent execution in tmp)
if ! grep -q "/run/shm" /etc/fstab; then
    echo "tmpfs     /run/shm    tmpfs   defaults,noexec,nosuid 0 0" >> /etc/fstab
    echo "Added /run/shm security to /etc/fstab"
fi

# 5. Install Unattended Upgrades
apt install -y unattended-upgrades
echo "✅ Unattended Upgrades installed."

# 6. SSH Hardening (Optional but recommended)
# sed -i 's/#PermitRootLogin prohibit-password/PermitRootLogin no/' /etc/ssh/sshd_config
# sed -i 's/PasswordAuthentication yes/PasswordAuthentication no/' /etc/ssh/sshd_config
# systemctl restart ssh

echo "✅ Security setup complete. Fail2Ban and UFW active."
echo "⚠️  IMPORTANT: Configure Cloudflare WAF for Geo-blocking (CZ only) and Anti-DDoS."
echo "⚠️  REMINDER: Create a non-root user for Docker and disable SSH password auth!"
