# Job Finder App
## Description

The Job Finder App is a web application that allows users to search for remote jobs using an external API. 
It provides meaningful job information and enables filtering by job title or category. 
The application is deployed across two servers with a load balancer to simulate traffic distribution.
## Features

- Search for remote jobs by keyword
- Filter jobs by category
- Save favorite jobs locally
- Deployed on two servers (Web01 & Web02)
- Load balancer distributes requests between servers
## Technologies & APIs Used

- HTML, CSS, JavaScript (frontend)
- Nginx (web server)
- Remotive API (https://remotive.io/api/remote-jobs)
## Local Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Akaliza-ux/job-finder-app.git
sudo mkdir -p /var/www/web01
sudo cp -r ~/job-finder-app/* /var/www/web01/
sudo vi /etc/nginx/conf.d/web01.conf
server {
    listen 8081;
    root /var/www/web01;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
sudo mkdir -p /var/www/web02
sudo cp -r ~/job-finder-app/* /var/www/web02/
sudo vi /etc/nginx/conf.d/web02.conf
server {
    listen 8082;
    root /var/www/web02;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
sudo vi /etc/nginx/conf.d/loadbalancer.conf
upstream job_app {
    server localhost:8081;
    server localhost:8082;
}

server {
    listen 8080;

    location / {
        proxy_pass http://job_app;
    }
}
sudo nginx -t
sudo nginx
Since ALU sandbox may not allow external browser access, we can use curl inside the sandbox:curl http://localhost:8081
curl http://localhost:8082
curl -s http://localhost:8080 | grep "Server:"