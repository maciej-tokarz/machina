# Scenariusz przygotowania Raspberry Pi od strony programowej

## Instalacja Raspbiana Jessie

Jako podstawę dziania posłuży wersja:

[Minimal image based on Debian Jessie](https://www.raspberrypi.org/downloads/raspbian/)

Po zainstalowaniu należy przejść do ustawień:
```
sudo raspi-config
```
oraz

- zmienić hasło administratora
- ustawić autologowanie do konsoli
- rozszerzyć partycję na całą objętość karty
- włączyć kamerę
- właczyć audio na jack-a
- włączyć SSH
- włączyć i2c
- włączyć GPIO Server

## Instalacja karty WiFi

Aby można było połączyć się z Raspberry Pi warto skorzystać z karty WiFi 
i sprawić aby przy starcie następowało automatyczne łączenie z naszą siecią:
```
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf

network={
    ssid="nazwa_sieci"
    psk="hasło"
}
```
## Instalacja Node.js
```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo reboot
node -v
```
## Przygotowanie miejsca na aplikacje serwera

Do pracy z plikami polecam: [WinSCP](https://winscp.net)
```
sudo mkdir /apps
sudo mkdir /apps/machina.api
sudo mkdir /apps/machina.spk
```
machina.api (sterowanie pojazdem, kamerą)
```
cd /apps/machina.api
sudo -s
sudo npm install i2c-bus
sudo npm install pca9685
sudo npm install express
sudo npm install request
```
machina.spk (odtwarzanie tekstów komunikatów)
```
cd ..
cd machina.spk
sudo npm install express

sudo chown -R pi:pi /apps
```

## Instalacja menedżera procesów PM2
```
http://pm2.keymetrics.io/docs/usage/quick-start/

sudo apt-get update
sudo apt-get upgrade
sudo npm install pm2@latest -g
sudo reboot

sudo pm2 startup systemd
sudo pm2 start /apps/machina.api/server.js --name machina.api -i 1
sudo pm2 start /apps/machina.spk/server.js --name machina.spk -i 1
sudo pm2 startup
sudo pm2 save

sudo pm2 restart machina.api
sudo pm2 restart machina.spk

sudo pm2 monit machina.api
sudo pm2 show machina.api
sudo pm2 delete machina.api
sudo pm2 log machina.api

sudo pm2 status
sudo pm2 update
```
## Ma mówić
```
sudo apt-get install espeak
amixer sset PCM,0 100%
espeak "Hello, I am Espeak, the voice synthesizer" 2>/dev/null
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

W opracowaniu...

z

z

z

z

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
# Uruchomienie strumienia:
```
cd mjpg-streamer/mjpg-streamer-experimental
./mjpg_streamer -i "./input_raspicam.so -fps 8 -x 400 -y 225" -o "./output_http.so -w ./www"
```
## Linki
```
Filmy https://1drv.ms/f/s!AoVId-NDPgmihPZR0ijOLWl7qOKYgQ
https://github.com/fivdi/pigpio
```
## Akumulatory
```
Napięcie minimalne bez obciążenia: 11,15V

```