# Scenariusz przygotowania Raspberry Pi od strony programowej

## Instalacja Raspbiana Jessie

Jako podstawę działania posłuży wersja:

[Minimal image based on Debian Jessie](https://www.raspberrypi.org/downloads/raspbian/)

Po zainstalowaniu należy przejść do ustawień:
```
sudo raspi-config
```
oraz

- zmienić hasło administratora-
- ustawić autologowanie do konsoli
- rozszerzyć partycję na całą objętość karty
- włączyć kamerę
- właczyć audio na jack-a
- włączyć SSH
- włączyć i2c
- włączyć GPIO Server
- włączyć Serial (jak po UART PuTTY)

## Instalacja karty WiFi

Aby można było połączyć się z Raspberry Pi warto skorzystać z karty WiFi 
i sprawić aby przy starcie następowało automatyczne łączenie z naszą siecią:
```
sudo nano /etc/wpa_supplicant/wpa_supplicant.conf

network={
    ssid="nazwa_sieci"
    psk="hasło"
}

## Zmiana ustawień na PL


```
## Instalacja Node.js
```
wget -O - https://raw.githubusercontent.com/sdesalas/node-pi-zero/master/install-node-v.last.sh | bash
node -v
```

pi@raspberrypi:~/machina.api$ ls /dev/tty*
/dev/tty    /dev/tty19  /dev/tty3   /dev/tty40  /dev/tty51  /dev/tty62
/dev/tty0   /dev/tty2   /dev/tty30  /dev/tty41  /dev/tty52  /dev/tty63
/dev/tty1   /dev/tty20  /dev/tty31  /dev/tty42  /dev/tty53  /dev/tty7
/dev/tty10  /dev/tty21  /dev/tty32  /dev/tty43  /dev/tty54  /dev/tty8
/dev/tty11  /dev/tty22  /dev/tty33  /dev/tty44  /dev/tty55  /dev/tty9
/dev/tty12  /dev/tty23  /dev/tty34  /dev/tty45  /dev/tty56  /dev/ttyACM0
/dev/tty13  /dev/tty24  /dev/tty35  /dev/tty46  /dev/tty57  /dev/ttyAMA0
/dev/tty14  /dev/tty25  /dev/tty36  /dev/tty47  /dev/tty58  /dev/ttyprintk
/dev/tty15  /dev/tty26  /dev/tty37  /dev/tty48  /dev/tty59  /dev/ttyS0
/dev/tty16  /dev/tty27  /dev/tty38  /dev/tty49  /dev/tty6
/dev/tty17  /dev/tty28  /dev/tty39  /dev/tty5   /dev/tty60
/dev/tty18  /dev/tty29  /dev/tty4   /dev/tty50  /dev/tty61
pi@raspberrypi:~/machina.api$ ls /dev/tty*
/dev/tty    /dev/tty19  /dev/tty3   /dev/tty40  /dev/tty51  /dev/tty62
/dev/tty0   /dev/tty2   /dev/tty30  /dev/tty41  /dev/tty52  /dev/tty63
/dev/tty1   /dev/tty20  /dev/tty31  /dev/tty42  /dev/tty53  /dev/tty7
/dev/tty10  /dev/tty21  /dev/tty32  /dev/tty43  /dev/tty54  /dev/tty8
/dev/tty11  /dev/tty22  /dev/tty33  /dev/tty44  /dev/tty55  /dev/tty9
/dev/tty12  /dev/tty23  /dev/tty34  /dev/tty45  /dev/tty56  /dev/ttyAMA0
/dev/tty13  /dev/tty24  /dev/tty35  /dev/tty46  /dev/tty57  /dev/ttyprintk
/dev/tty14  /dev/tty25  /dev/tty36  /dev/tty47  /dev/tty58  /dev/ttyS0
/dev/tty15  /dev/tty26  /dev/tty37  /dev/tty48  /dev/tty59
/dev/tty16  /dev/tty27  /dev/tty38  /dev/tty49  /dev/tty6
/dev/tty17  /dev/tty28  /dev/tty39  /dev/tty5   /dev/tty60
/dev/tty18  /dev/tty29  /dev/tty4   /dev/tty50  /dev/tty61
pi@raspberrypi:~/machina.api$





















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
# Uruchomienie podglądu z kamery:
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