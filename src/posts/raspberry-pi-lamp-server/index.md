---
title: Raspberry Pi LAMP Server
date: "2018-05-07T14:46:37.121Z"
path: "/raspberry-pi-lamp-server/"
---

## Things used in this project

#### Recommended:

- <a target="_blank" href="https://www.amazon.com/gp/search?ie=UTF8&tag=techlis05-20&linkCode=ur2&linkId=8e9b09a70535e3e8c18c6da637bf7039&camp=1789&creative=9325&index=electronics&keywords=raspberry pi">Raspberry Pi 3 Model B</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=techlis05-20&l=ur2&o=1" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /> - Pi 2 or 3 should work, the latest version may get better performance.
- <a target="_blank" href="https://www.amazon.com/gp/search?ie=UTF8&tag=techlis05-20&linkCode=ur2&linkId=90e5ecd3a209b302aecbe828e4e879b5&camp=1789&creative=9325&index=electronics&keywords=Micro SD Memory card">Micro SD Memory card</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=techlis05-20&l=ur2&o=1" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /> - At least 8GB storage to host Raspbian OS, other apps, files and emails.
- <a target="_blank" href="https://www.amazon.com/gp/search?ie=UTF8&tag=techlis05-20&linkCode=ur2&linkId=95d11834ecb832880a12d366c125635b&camp=1789&creative=9325&index=electronics&keywords=Ethernet Cord">Ethernet Cord</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=techlis05-20&l=ur2&o=1" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /> or <a target="_blank" href="https://www.amazon.com/gp/search?ie=UTF8&tag=techlis05-20&linkCode=ur2&linkId=86ef367db53fd2fa8c56774ed8f4a7be&camp=1789&creative=9325&index=electronics&keywords=Wifi dongle">Wifi dongle</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=techlis05-20&l=ur2&o=1" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" /> (The Pi 3 has build-in Wifi)

As it is a server, you may want to run it headless (i.e., without display, no GUI). Hence, you could download the [Noobs lite version](https://www.raspberrypi.org/downloads/noobs/) and install the minimum Raspbian OS (without Desktop GUI). Add an empty file 'ssh' to the root folder of your mini sd card to enable SSH access. Find your pi's IP address from your router, then you can access it headlessly by
```
ssh pi@your-pi-local-ip-address
```
Default password is '**raspberry**'. Change your 'pi' password as soon as you get in
```
sudo passwd pi
```

#### Optional:

- <a target="_blank" href="https://www.amazon.com/gp/search?ie=UTF8&tag=techlis05-20&linkCode=ur2&linkId=f303607b9b11e1d8e7780ef78ff41987&camp=1789&creative=9325&index=electronics&keywords=Raspberry Pi Case">Raspberry Pi Case</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=techlis05-20&l=ur2&o=1" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
- <a target="_blank" href="https://www.amazon.com/gp/search?ie=UTF8&tag=techlis05-20&linkCode=ur2&linkId=14d846f7928fd5f610126a62e50a4647&camp=1789&creative=9325&index=electronics&keywords=USB Keyboard">USB Keyboard</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=techlis05-20&l=ur2&o=1" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
- <a target="_blank" href="https://www.amazon.com/gp/search?ie=UTF8&tag=techlis05-20&linkCode=ur2&linkId=43596404f85664813e50637cdd446f4b&camp=1789&creative=9325&index=electronics&keywords=USB Mouse">USB Mouse</a><img src="//ir-na.amazon-adsystem.com/e/ir?t=techlis05-20&l=ur2&o=1" width="1" height="1" border="0" alt="" style="border:none !important; margin:0px !important;" />
- Your own domain name (etc. example.com)

### Install Apache web

Run the following commands:

```
sudo apt-get install apache2 -y
sudo nano /etc/apache2/sites-enabled/000-default.conf 
```
You must update the domain name of the website you are building at this time. If you are content to host this internally, then you may skip this, but you will always have to use the IP address of the Raspberry Pi to access the site.

```
ServerName example.com 
ServerAdmin user@example.com 
```

Then enable apache and check status by these commands:

```
sudo systemctl enable apache2
sudo systemctl start apache2
sudo systemctl status apache2
```

You can test the web server by enter the address ```http://localhost``` or the IP address of your Pi into Web Browser.
You should see this in your browser window:

![Apache2 Debian Default Page](./apache-it-works.png)

### Install PHP

Install the PHP and Apache packages with the following command:

```
sudo apt-get install php -y
sudo service apache2 restart
sudo nano /var/www/html/info.php
```

Add the following into the newly created file:

```
<?php
phpinfo();
?>
```

Ctrl-X to exit, Y to save. Test that you have successfully set up PHP by entering your browser and using `http://localhost/info.php`

```
sudo mv /var/www/html/index.html /var/www/html/index.old
```

### Install MySQL

```
sudo apt-get install mysql-server php-mysql -y
sudo systemctl start mysql
sudo systemctl status mysql
sudo service apache2 restart
sudo mysql_secure_installation
```

I changed the root password, removed test database, and removed the anonymous user access. The rest I did not change. You can test that MySQL is running by entering:

```
sudo mysql -u root -p
```

Type _`quit`_ to exit MySQL.

### SSL Encryption Certificate with Let's Encrypt

Also, give Lets Encrypt a go!

```
sudo apt-get install git
sudo git clone https://github.com/letsencrypt/letsencrypt /opt/letsencrypt
cd /opt/letsencrypt
./letsencrypt-auto --apache -d example.com -d www.example.com
```

To renew the certificate (when you receive a reminder email that your certificate is expiring), I just ran:

```
cd /opt/letsencrypt
./letsencrypt-auto renew
```

### Optional: Install PhpMyAdmin

During the setup of PHPMyAdmin, you will be asked some questions; choose Apache and No to the DB Common.

```
sudo apt-get -y install phpmyadmin
sudo nano /etc/apache2/apache2.conf
```

You must add an include to the end of the [apache.conf](http://apache.conf/) file:

```
Include /etc/phpmyadmin/apache.conf
```

Ctrl-X to exit, Y to save.

```
sudo systemctl restart apache2.service
```

You are no longer able to log in to PHPMyAdmin using root, so you will need to create an alternate user with full admin rights as follows:

```
sudo mysql -u root -p
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'some_pass';
GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;
quit
```

Then you must reference the new user name in the config file as follows:

```
sudo nano /etc/dbconfig-common/phpmyadmin.conf

```

Replace phpmyadmin user name with just admin:

```
# dbc_dbuser: database user
#       the name of the user who we will use to connect to the database.
dbc_dbuser='admin'
```

To access PHPMyAdmin, you can access using the new link: `http://your-IP-address/phpmyadmin`

**Enjoy!**

##What's next

With this minimal LAMP server you can setup:
- WordPress: Web content management
- Cloud storage: Owncloud, Nextcloud, Seafile, etc.
- [Email Server](../raspberry-pi-email-server)
- Git Server: Bitbucket, Gitlab, etc.
- Media Server: Plex, Emby, Kodi, etc.
- Torrent server
- SVN
- Jira
- etc...