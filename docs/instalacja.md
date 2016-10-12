# Scenariusz przygotowania Raspberry Pi od strony programowej

## Instalacja Raspbiana Jessie

Jako podstawę działania posłuży wersja:

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
sudo pm2 start /apps/machina.prv/server.js --name machina.prv -i 1
sudo pm2 start /apps/machina.spk/server.js --name machina.spk -i 1

sudo pm2 startup
sudo pm2 save

sudo pm2 restart machina.api
sudo pm2 restart machina.prv
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
# Uruchomienie podglądu z kamery GStreamer (https://gstreamer.freedesktop.org/):
sudo nano /etc/rc.local
raspistill --nopreview -w 300 -h 168 -vf -hf -q 50 -o /apps/stream/picture.jpg -tl 50 -t 9999999 -th 0:0:0 &

exit 0

machina.prv (preview)
sudo node /apps/machina.prv/server.js
http://192.168.1.7:8003
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


## Podgląd stare



mkfifo fifo.500
/opt/vc/bin/raspivid -o fifo.500 -t 0 -b 20000




cat fifo.500 | nc.traditional 192.168.1.7 5000 &


```
???
sudo apt-get install libav-tools
???

sudo -s
sudo apt-get install git

cd /usr/src
git clone git://git.videolan.org/x264
cd x264
./configure --host=arm-unknown-linux-gnueabi --enable-static --disable-opencl
make
sudo make install

cd /usr/src
git clone https://github.com/ffmpeg/ffmpeg.git
cd ffmpeg
sudo ./configure --arch=armel --target-os=linux --enable-gpl --enable-libx264 --enable-nonfree
make
sudo make install

raspivid -o - -t 0 -vf -hf -fps 30 -b 6000000 | ffmpeg -re -ar 44100 -ac 2 -acodec pcm_s16le -f s16le -ac 2 -i /apps -f h264 -i -

raspivid -o - -t 0 -vf -hf -fps 30 -b 6000000 | ffmpeg -re -ar 44100 -ac 2 -acodec pcm_s16le -f s16le -ac 2 -i /dev/zero -f h264 -i - -vcodec copy -acodec aac -ab 128k -g 50 -strict experimental -f flv rtmp://192.168.1.7:8003

ffmpeg raspivid

TODO: dostroić podgląd aby nie było lagów!

Opcja z zapisem sekwencyjnym zdjęć:

sudo mkdir /apps/stream

sudo nano /etc/rc.local

raspistill --nopreview -w 400 -h 225 -vf -q 30 -o /apps/stream/picture.jpg -tl 50 -t 9999999 -th 0:0:0 &

raspistill --nopreview -w 300 -h 168 -vf -hf -q 50 -o /apps/stream/picture.jpg -tl 50 -t 9999999 -th 0:0:0 &

exit 0

Podgląd
sudo nano /etc/apt/sources.list
dodać
deb http://vontaene.de/raspbian-updates/ . main

sudo apt-get install debian-keyring
gpg --keyserver pgp.mit.edu --recv-keys 1F41B907
gpg --armor --export 1F41B907 | sudo apt-key add -

sudo apt-get update
sudo apt-get install gstreamer1.0

apt-get install gstreamer-tools