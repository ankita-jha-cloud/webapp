#!/bin/bash

sleep 30
sudo apt-get update -y
# sudo amazon-linux-extras install php8.0 mariadb10.5
# sudo apt-get install -y httpd


sudo apt-get install zip unzip
sudo apt update && sudo apt install --assume-yes curl
curl --silent --location https://deb.nodesource.com/setup_16.x  | sudo bash -


echo "Installing mysql server"
# I have to remove that sqlll!!
# sudo apt-get install mysql-server -y

sudo mysql <<EOF

CREATE DATABASE nodemysql;

CREATE USER 'newuser'@'localhost' IDENTIFIED BY 'newpassword';

GRANT ALL PRIVILEGES ON nodemysql.* TO 'newuser'@'localhost' WITH GRANT OPTION;

FLUSH PRIVILEGES;

EOF

echo "Starting mysql server"

sudo service mysql start


sudo apt-get install -y nodejs
sudo apt-get install -y gcc g++ make

sudo npm i pm2
sudo npm i -g pm2
cd ~/ && unzip webapp.zip
cd ~/webapp && npm i
sudo pm2 start server.js
sudo pm2 startup systemd

# sudo mv /tmp/webapp.service /etc/systemd/system/webapp.service
# sudo systemctl start webapp.service
# sudo systemctl enable webapp.service