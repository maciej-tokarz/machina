## Instalacja Raspbiana Jessie

Jako podstawę dziania posłuży wersja:

[Minimal image based on Debian Jessie](https://www.raspberrypi.org/downloads/raspbian/)

Po zainstalowaniu należy:

sudo raspi-config

- zmienić hasło administratora
- rozszerzyć partycję na całą objętość karty
- włączyć kamerę
- właczyć audio na jack-a
- włączyć SSH
- włączyć i2c
- włączyć GPIO Server
- włączyć obsługę Serial

## Serwa SG90
```
brązowy przewód: GND (masa zasilania)
czerwony przewód: Zasilanie 5 V
pomarańczowy przewód: sygnał PWM
```
## Czujnik odległosci SR04
```
http://uczymy.edu.pl/wp/blog/2016/01/20/hc-sr04/
UWAGA! Echo trzeba obniżyć do 3,3V
```
## Instalacja karty WiFi
```
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf

network={
    ssid="nazwa_sieci"
    psk="hasło"
}
```
## Instalacja Node.js
```
sudo apt-get install nodejs
sudo apt-get install nodejs-legacy
sudo apt-get install npm
sudo reboot
node -v
```
## Instalacja menedżera procesów PM2
```
http://pm2.keymetrics.io/docs/usage/quick-start/

sudo apt-get update
sudo apt-get upgrade
sudo npm install pm2 -g

sudo reboot
sudo pm2 startup systemd
# sudo pm2 start /apps/node-tts/ttsserver.js --name node-tts -i 1
sudo pm2 start /apps/machina.api/server.js --name machina.api -i 1
sudo pm2 startup
sudo pm2 status
# sudo pm2 restart node-tts
sudo pm2 restart machina.api
sudo pm2 monit machina.api
sudo pm2 show machina.api
sudo pm2 delete machina.api
```
## Nginx
```
sudo apt-get install nginx
sudo /etc/init.d/nginx start

sudo mkdir /apps
sudo mkdir /keys
sudo mkdir /logs

sudo chown -R pi:pi /apps
sudo chown -R pi:pi /keys
sudo chown -R pi:pi /logs
```
Jeśli pojawi się błąd 403 braku dostępu nginx-a to trzeba wykonać:
```
sudo chmod -R 775 /apps
sudo chmod -R 775 /keys
sudo chmod -R 775 /logs
```
Ustawienia
```
sudo nano /etc/nginx/sites-available/default

server {
  listen 80;
  server_name 192.168.1.44;

  location / {
    proxy_pass http://127.0.0.1:8000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
    error_log /logs/machina_api.errors;
  }
}
```
Restart
```
sudo service nginx restart
```
Ustawienie kompresji
```
sudo nano /etc/nginx/nginx.conf
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_buffers 16 8k;
gzip_http_version 1.1;
gzip_types text/plain text/css application/json application/x-javascript text/xml application/xml application/xml+rss text/javascript;
```
Diagnostyka
```
sudo service nginx configtest
sudo service nginx status
sudo ps -aux | grep nginx
sudo nginx -v
```
## Instalacja Pico Speakera
```
https://github.com/tom-s/pico-speaker
sudo apt-get install libttspico0 libttspico-utils libttspico-data alsa-utils

md machina.spk
cd machina.spk
npm install pico-speaker --save

głośność
amixer  sset PCM,0 100%
```
## Sterowanie silnikami i serwami
```
sudo -s
sudo npm install -g node-gyp
sudo nano /usr/include/nodejs/deps/v8/include/v8.h

enum WriteOptions {
    NO_OPTIONS = 0,
    HINT_MANY_WRITES_EXPECTED = 1,
    NO_NULL_TERMINATION = 2,
    PRESERVE_ASCII_NULL = 4,
    REPLACE_INVALID_UTF8 = 0 <<< Dodać!!!
  };

sudo npm install i2c-bus
```
## Cordova (https://cordova.apache.org/docs/pl/latest/guide/cli/)
```
npm install -g cordova
cordova create machina.app nazwa_wydawcy Machina
cd machina.app
cordova platform add android --save

d:\Projekty\Machina\machina.app>cordova requirements

cordova build
cordova emulate android
cordova run android
```
## Kolory
```
Wiodący rgb 0 114 198 hex 0072C6
```
## Różności
```
Uprawnienia roota
sudo -s

Usunięcie katalogu
sudo rm -r /foo/foo

Aktualizacja
sudo apt-get update        # Fetches the list of available updates
sudo apt-get upgrade       # Strictly upgrades the current packages
sudo apt-get dist-upgrade  # Installs updates (new ones)

Sprzątanie
sudo apt-get autoclean
sudo apt-get clean
sudo apt-get autoremove

Usuwanie pakietu
sudo apt-get remove <package> && sudo apt-get autoremove
```
## Linki
```
http://html5gamepad.com/
https://github.com/bwiklund/gamepad.js
```