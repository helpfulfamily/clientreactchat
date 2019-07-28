  # CONFIGURATION:
 
  You need to install Node.js first.
 Then, you need to install Yarn using Npm like this:
 
  npm install --global yarn
  
  So, you can use Yarn to install libraries in packages.json like this:
  yarn install
  
  Then build project:
  
  yarn build
  
  And then run project:
  
  yarn start
  
  
  NOTE:
  
  If you get an error like this:

  
  C:\Users\Username\clientha>yarn start
yarn run v1.16.0
$ export HTTPS=true && react-scripts start
'export' is not recognized as an internal or external command,
operable program or batch file.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.

In this case, just try SET instead of Export in  package.json like this:
  
      "start": "set HTTPS=true && react-scripts start",


# KANALA GİRME:

Bir kanala girme işlemi Join buttonu ile yapılır.

NavbarMenu.js componenti içerisinde şöyle bir Link componenti vardır:
```
 <Link to={{
                              pathname:  "/channelcontents/" + this.state.currentPath,

                          }}> Join</Link>
```

Bu linke tıklandığında ilgili kanal sayfasına yönleniyor.

# KANAL YARATMA

Kanala girdikten sonra, kanal bilgileri çekilir. Eğer kanal veritabanında yoksa veya veritabanında olmasına rağmen bir sahibi yoksa "Create" buttonu görüntülenir. (Aksi takdirde Observe buttonu görüntülenir.)

---- Burada Create buttonunun nasıl çalıştığı, hangi React componentleri içerisinde kodlandığı anlatılacak.

# KANALI OBSERVE ETME

Bir kanal yaratılmışsa, onu Observe etmek mümkündür. Dolayısı ile bu durumda Observe buttonu görünür.

---- Burada Observe buttonunun nasıl çalıştığı, hangi React componentleri içerisinde kodlandığı anlatılacak.

  
# KANALI UNOBSERVE ETME 
Bir kanal Observe listenizde ise, onu Unobserve ederek listenizden çıkarmak mümkündür. Dolayısı ile Observe edilen kanala girildiğinde Unobserve buttonu görünür. 

----Burada Unobserve buttonunun nasıl çalıştığı, hangi React componentleri içerisinde kodlandığı anlatılacak.
