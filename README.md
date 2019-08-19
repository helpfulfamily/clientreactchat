 # DEMO:
 https://clientreactchat-webclient.b9ad.pro-us-east-1.openshiftapps.com
 
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
      
 # Kodu değiştirip, yerel depoya (COMMIT) ve uzak depoya (PUSH) aktarma işlemi.
  1- Master branchinde olduğuna emin ol.
  
  2- Master branchini güncelle.
  
  3- Kendi branchini yarat ve bu branchte kal.
  
  4- Kodlama yap ve hata hata vermediğinden emin ol. (Yarn start ile kontrol et.)
  
  5- Kodlamayı bitirdi ise ve hata yoksa, yerel depoya COMMIT yap.

  6- Commitlediğin kodu, uzak depoya PUSH yap.
  
  7- Pull Request oluştur.
 
  8- Pull Request'in diğer bir yazılımcı tarafından Review-Approve yapılmasını bekle. 
  
  9- Approve edilmiş (kabûl edilmiş) kendi branchini, Master branch ile merge et (birleştir). Uzak depodaki kendi branchini sil ve yerel depoda "master" branchine geçip, master'ı güncelledikten (PULL) sonra, yerel depodaki kendi branchini de sil.

 # Problem Çözme Yöntemleri
  
  1- Bir dedektif gibi, gözlem yapmak ve eldeki verilerden yararlanarak bazı varsayımlarda bulunmak gerekir.
  
  2- Arayüzdeki herhangi bir bileşenin, arka tarafta çalışan koduna, bu varsayımlar aracılığı ile erişmemiz gerekir.
  
  3- Örnek:
  
    Arayüzde "Unobserve" diye bir button var. Bu buttonun arkada çalışan JS koduna nasıl erişiriz?
   "Unobserve" kelimesini, Intellij IDEA içerisinde "Alt-Shift-F" kombinasyonu ile açılan kutuda (Find in Path) ararız.
    Karşımıza çıkan sonuçlar içerisinde, akla en yatkın olanını buluruz. Buradaki örnek için: ObservationPanel.js JS kodu.
  
  4- Bunun için tarayıcıların kendi developer araçları kullanılabilir. Örnek: Chrome Inspect.
  
  5- Yukarıdaki mimari çizime bakılarak, sorunun hangi modülde olduğu tahmin edilebilir.
  
  6- Bir buttona basıldığında çağrılan REST methodu incelenebilir. (Chrome Inspect-> Network)
   
   
 # Üst düzey ilişki görseli
 If you want to embed images, this is how you do it:

![Image of Higher level relations](https://github.com/helpfulfamily/clientreactchat/blob/master/60473125_204786917164054_756205996929449984_o.jpg?raw=true)

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

 Create buttonuna basıldığında, Gateway tarafındaki "createChannel" REST methodu çağrılacak.
 Bu method parametre olarak Channel nesnesi alıyor.
 
 Javadaki karşılığı şu şekildedir:
 ```
    @PostMapping("/createChannel")
    @ApiOperation(value = "Create Channel")
    @ApiImplicitParams(@ApiImplicitParam(name = "Authorization", value = "JWT authorization token",
            required = true, dataType = "string", paramType = "header"))
    @ApiResponses({@ApiResponse(code = 200, message = "Create Channel OK")})
    public void createChannel(KeycloakAuthenticationToken kat, @RequestBody Channel channelObject)
    
```

Bu Java REST methodu, ReactJS tarafında şu şekilde çağrılır.
ObservationPanel.js içerisindeki şu button aracılığı ile, süreç başlar:
```
   <Button color="primary"  onClick={(e) => this.createChannel(e)}>Create </Button></span>;
 
```

 Yukarıda görüldüğü üzere, buttona tıklayınca  createChannel(event) adlı JavaScript fonksiyon çağrılıyor.
 Bu method aşağıdaki gibidir:
 ``` 
  createChannel(event) {
        event.preventDefault();


            getToken(this.props.loginUser.sso.keycloak).then((token) => this.startCreateChannelProcess(token))
                .catch(function (hata) {

                    console.log(hata)
                });


    }
    startCreateChannelProcess = (token) => {

        var apiBaseUrl = properties.channel_create;

       //Channel JSON objesi
        var channel = {
            "name": this.props.channel.name,
        }


        this.props.postData(apiBaseUrl, channel, token);
    }
```
 Yukarıdaki kodda, "Create" buttonuna tıklanınca çağrılan ilk fonksiyon:  createChannel(event) olmasına rağmen, bu fonksiyon içerisinde ilk önce Keycloak kullanıcı yönetim sisteminden, bir anahtar istenir. Çünkü kanal yaratma işlemi, ancak kullanıcı olanların yapabileceği bir işlemdir.
  
  Eğer anahtar almada bir sıkıntı olmazsa, ikinci fonksiyon olan startCreateChannelProcess, bu ilk method içerisinde çağrılır.
  startCreateChannelProcess fonksiyonu içerisinde, minimum bir "channel" JSON nesnesi tanımlanarak, kanal ismi burada verilir.
  
  Bu channel JSON objesi, token ile birlikte apiBaseUrl ile belirtilen (Java tarafındaki) createChannel methoduna gönderilir.
  
# KANALI OBSERVE ETME

Bir kanal yaratılmışsa, onu Observe etmek mümkündür. Dolayısı ile bu durumda Observe buttonu görünür.

---- Burada Observe buttonunun nasıl çalıştığı, hangi React componentleri içerisinde kodlandığı anlatılacak.

  
# KANALI UNOBSERVE ETME 
Bir kanal Observe listenizde ise, onu Unobserve ederek listenizden çıkarmak mümkündür. Dolayısı ile Observe edilen kanala girildiğinde Unobserve buttonu görünür. 

----Burada Unobserve buttonunun nasıl çalıştığı, hangi React componentleri içerisinde kodlandığı anlatılacak.

# KANAL NESNESİ İLE KANALA GÖNDERİLEN MESAJ İLİŞKİSİ İLİŞKİSİ
Kanal Java tarafında Channel sınıfı ile temsil ediliyor. Kanal içeriği olan mesajlar ise ChannelContent ile temsil edilir.
Clientreactchat tarafında bir kanala tıklandığında, o kanala ait mesajlar Gateway aracılığı ile çekilir.

# KANAL LİSTESİ
  Kanal listesi, kullanıcının observe ettiği kanalların listesidir.
  ChannelNameList.js componenti içerisinde kodlanmıştır.

```
     <ListGroup className="problemtitle">
                {this.props.loginUser.channels.map((item, index) => (
                    <ListGroupItem key={item.id}> <Link to={{
                        pathname: '/channelcontents/' + encodeURIComponent(item.name),
                        state: {
                            name: item.name
                        }
                    }}> #{item.name}</Link>
                        
                    </ListGroupItem>
                ))}
            </ListGroup>
```

# KANAL LİSTESİNE TIKLANDIĞINDA MESAJLARIN YÜKLENMESİ:

   Yukarıdaki, ChannelNameList.js kod parçacığında görülen Link componenti, kanalın tıklandığı yerdir. 
   Kanala tıklandığında, /channelcontents/[kanaladı] yoluna yönlenir. 
   Bu yolun karşılığı olan route componenti aşağıda görüldüğü gibidir:
   ```
      <Route exact path="/channelcontents/:title" component={ChannelContentList} />
   ```
   Bu ne demektir?  Bu patterne (kalıp, örüntü, desen) sahip bir URL çağrıldığında ChannelContentList.js componenti yüklenir.
   
   ChannelContentList componenti ilk yüklendiğinde, Gateway'e gidip kanal mesajlarını çekecek olan fonksiyon aşağıdaki gibi çağırılır.
   
           ```
    componentDidUpdate(prevProps) {

         ....
         
        // Yeni bir kanala girilip girilmediği bu şekilde öğrenilir.
        if (prevProps.location.pathname != this.props.location.pathname) {
            
             ... 

            // Kanaldaki mesajları çeker.
            pageNumber=0;
            this.props.fetchData(properties.channel_contents + this.props.match.params.title + "/"+ pageNumber);
       
            ....

        }

    }
            ```

  Yukarıdaki kodda Gateway modülündeki /contents/{name}/{amount}  REST methodu çağrılarak, kanal mesajları listelenir.
    
    
# KANALDAKİ SONSUZ SCROLL İLE MESAJLARIN SAYFALANMASI:
    
   
   Kanala ilk kez girildiğinde, yukarıda anlatılan işlemler sonucunda en son gönderilen 10 mesaj listelenir.
    
   
   Scroll en yukarı çıkarıldıkça, 10'ar 10'ar geçmişe dönük mesajlar yüklenmeye devam eder.
    
   
   Scroll'un hareketini tesbit eden method nedir?
    
   Öncelikle, bahsedilen scroll, ChannelContentList.js componenti içerisindeki ListGroup componentinin scrolludur.
   
   
     
   <ListGroup className="scrollablediv"  id="messageBody"  onScroll={this.listenScrollEvent}>
 
 
  
    
   Yukarıdaki onScroll={this.listenScrollEvent} ifâdesi, herhangi bir scroll hareketi esnâsında çağrılacak olan fonksiyonu belirtir.
           
   Bu fonksiyon aşağıdaki gibidir.
 
 
 ```
  listenScrollEvent() {
           ...

        // Scroll, en yukarı değdiğinde geçmiş mesajlar çağrılıyor.
        if(messageBody.scrollTop==0){

            pageNumber=pageNumber+1;
            this.props.appendList(properties.channel_contents + this.props.match.params.title + "/"+ pageNumber);
        }


    }
  
```
# REDUX
# Uygulama belleğinin, yani verilerin o ânki hâlinin Redux ile yönetimi
Redux, bir servis çağrısından dönen veriyi, bir "Action" nesnesine indirger. 

Bizim uygulamamıza, şimdilik iki noktadan veri gelebilir: 

1- Axios kullanılarak yapılan REST çağrısı ile bir talepte (request) bulunur ve hemen ardından bir cevap (response) döner.
  
   Dolayısı ile dönen cevabın alındığı yer, yine REST çağrısının yapıldığı ve Axios kullanılan yerdir.

2- Gene Rest çağrısı ile başlatılsa da, cevabın WebSocket aracılığı ile alındığı durum. Buna örnek olarak Thancoin transferi verilebilir.
   
    clientreactchat(transaction) -> 
                       gateway (Message<Transaction>) -> 
                                  persist(Message<Transaction>)) -> 
                                               notification(Message<Transaction> )-> 
                                                               clientreactchat {
                                                           
                                                                  websocket.js{
                                                                             store()
                                                                        } 
                                                                           -> TransactionProcess.js {dispatcherTransaction()}
                                                                           ->  sso.ja {loginReducer()}
                                                                     }

Bunda algoritma şöyle işler:

  1- ThankcoinPanel, teşekkür buttonunun olduğu bileşendir. Bu bileşen yüklendiği ânda bir transaction şu şekilde yaratılır:
  
  
    transaction =  TransactionProcess.js { getTransaction() } 
   
   
 2- Bu transaction, teşekkür buttonuna basıldığında Axios kullanılarak Gateway modülüne ilerilir. 
   
    TransactionProcess.js { startTransaction()} 
       
3- Gateway bu transaction JSON objesini Persist modülüne iletir.
       
4- Transaction kaydedilip, ilgili göndericiden 1 Thankcoin silinip, alıcıya başarılı bir şekilde aktarılırsa, buna dâir bilgi, Notification modülüne aktarılır.
       
5- Notification, Websocket dağıtımının yapıldığı modüldür. İşlemin başarılı olduğu bilgisini, Thankcoin'i gönderen ve alan kişilere bildirir. 
      
6- Dolayısı ile, uygulamanın verisindeki değişiklik "Websocket.js" içerisindeki şu noktada başlar:
 
 
     
           ```     
               stompClient.subscribe("/topic/sendThankCoin", function (notification) {
                 dispatcherTransaction(notification, store)
                 });
           ```     
       
       
       
Store: Uygulamadaki tüm verilerin tutulduğu global bir depo veya bir bellek olarak düşünülebilir.
Bizim uygulamamızda, configureStore.js içerisinde bir kereliğine tanımlanır ve kullanılır. Her uygulamada bir adet "store"
bulunur.
```
     import { createStore, applyMiddleware } from 'redux';
     import thunk from 'redux-thunk';
     import rootReducer from '../reducers';

     export default function configureStore(initialState) {

         var store= createStore(
             rootReducer,
             initialState,
             applyMiddleware(thunk)
         );

         return store;
     }

```
# Piyano örneği ile Redux olayını anlatalım.
 

 Redux= Piyanist.
 
 Store= Piyano
 
 Action= Nota (Mesela "Do" notası) 
 
 Reducer= Tuş
 
 
 Nota kağıdına bakmak=  Bir servis çağırmak. Yani, nota kağıdındaki müziği piyanoya aktarma işlemini (action) başlatmak.
 Mesela "Do" notası görüldü, piyanoda "Do" tuşuna (reducer) basılacaktır.
 
 Tuşlara basmak=  Herhangi bir servis çağırarak, store'un (piyanonun) o ânki hâlini (ritmini) değiştirmek.
  
