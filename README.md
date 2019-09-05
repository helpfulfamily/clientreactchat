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
   
   
     
   < ListGroup className="scrollablediv"  id="messageBody"  onScroll={this.listenScrollEvent}>
 
 
  
    
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
                                                                             connect()
                                                                        } 
                                                                           -> TransactionProcess.js 
                                                                                 {
                                                                                   dispatcherTransaction()
                                                                                   }
                                                                                    
                                                                                     ~ sso.js {
                                                                                            loginReducer()
                                                                                            }
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

# Dönerci Metaforu - Thankcoin Aktarma
Dönerci metaforu üzerinden Thankcoin aktarma işlemi sırasındaki veri akışını Redux ile nasıl kontrol ettiğimiz kolaylıkla anlatılabileceği gibi, ileriki projelerde de, bu metafor üzerinden iletişim kurmamız kolaylaşabilir.

System serisinin System18 adlı kitabındaki Aru, Deniz, Eren karakterleri üzerinden bu metaforu oluşturabiliriz.

Aru evde tek başına iken, Eren ve Deniz nefes nefese kalmış bir şekilde Aru'nun kapısını çalar.
Aru ne olduğunu sorar ama bu ikisi heyecândan ne diyecekleri bilemez.
Dolayısı ile, Aru önce oturup bir şeyler yiyelim, çay içerken rahat rahat konuşuruz der. Eren çok aç olmadığını söyler. 
Aru da, "Ben de pek aç değlim. Hatırladığım kadarı ile, sen de benim gibi soğansız yiyordun. O hâlde bir döner söyleyeyim, bölüşelim" diye cevap verir. Eren tebessüm eder ve "Tamamdır!" der.

Aru evde tek başına olduğundan ve yemek yapmaya zamân bulamayacağından ötürü, dışarıdan" (external service) döner sipariş etmeye karâr verir.

Dönerciye telefon eder (axios ile bir servis çağrısı yapar); siparişlere dâir bilgileri iletir. (Transaction datasının, servis tarafına aktarılması) 

Aru (Bey): sebzesiz, çift ekmekli, ayran
Deniz (Hanım): her şey bol ve acılı, şalgam
 
Dönerci'de telefonu açan kişiye (gateway) bu siparişler veriliyor ama, dönerci (servis tarafı) bu kimselerin adlarını bilmek zorunda değil.
O sâdece dönerlerin içeriği ile ilgilenir. (Yani servis tarafına gönderilen datadaki bilgi ile ilgilenir)

Siparişler, (servis tarafındaki) değişik ustalar (persist: döneri hazırlıyor, notification: paketi hazırlıyor)   tarafından hazırlanır. 

Bu arada, kapı çalar ve Aru'nun annesi Umay eve gelir. Annesine de aç olup olmadığını sorarlar. Aç olmadığını söyler.  

Notification, paketi hazırlayıp mobilet ile döner siparişini adrese götürecek olan dağıtımcıya (WebSocket) verir.

(Not: (REST çağrısının yeterli olduğu durum) Eğer döner evde değil de dönercide yenecek olup, bir sipariş dağıtımı gerekmese idi, dağıtımcıya da gerek olmazdı.
Dönercide sipariş verir ve orada yerdik.)


Dağıtıcı elindeki adrese ("/topic/sendThankCoin") bakarak siparişi bırakır.

Diğerleri "ormanda olup bitenlerle ilgili" derin bir muhabbete daldıkları için kapıyı Aru'nun annesi Umay açar.

Umay siparişi alır. Döner paketlerinin üzerinde, dönerlerin içerikleri yazmaktadır.
Sipariş sırasında nasıl söylendi ise o şekilde yazıyor. Ama, dönerci sipariş edenlerin isimlerini bilmediği için, ilgili kimselere dönerleri vermek Umay'a düşüyor.
 
 Haydi gençler, bu kadar muhabbet yeter. Şimdi karnınızı doyurma zamânı diyor. 
 Dönerlerin içeriklerini kontrol ederek, ilgili kişilere veriyor.
 (Switch-case)

  "Her şey bol, acılı ve yanında şalgam olduğuna göre, bu senin olmalı Eren? Peki sen aç değil misin Deniz?" diye soruyor ama Deniz biraz mahçup olarak, hayır benim diyor.
 "O hâlde, BUYUR_DENİZ"

 Umay "Peki ya Eren aç mı kalacak?" diye sorunca, Aru: "Onunla bölüşeceğiz" diye karşılık verince; Umay "BUYRUN_BEYLER" diyerek dönerin yarısını Aru'nun tabağına (reducer), yarısını ise Eren'in tabağına koyar.
 
  Yukarıdaki hikâyedeki benzetmeler:

  Dönerci: Servis tarafı. (Gateway -> Persist -> Notification {Websocket-server}
  Sipariş eden (Aru) : Client tarafı (Clientreactchat.)
  Siparişi alan (Umay) : Redux. Umay, nasıl ki gelen dönerin içeriğine bakarak ilgili kişilere dağıtıyorsa; Redux da, action ve reducer aracılığı ile bunu yapar. Burada action'ı şöyle düşünebiliriz. BUYRUN_BEYLER, BUYUR_DENİZ gibi komutlar Action içerisindeki "type" değerine karşılık gelir. Burada, tek bir Action'ın (BUYRUN_BEYLER tipinde bir aksiyon) birden fazla reducer'ı (tabağı) etkilediği görülür.
   
   Transaction için action örneği:
   
   export function transactionChannel(transaction) {
    return {
        type: 'TRANSACTION_CHANNEL',   // Kargonun türü, başlığı
        transaction   // Kargo kutusunun içindeki şey.
    };
}

   
# Dönerci Metaforu - Kanala Giriş

Eren stresli bir gün geçirdiğini ve bunun da kendisini iyice acıktırdığını söyler. Aru ise geçen sefer sipariş verdikleri yerden tekrar döner sipariş etmeyi teklif eder. O sırada Deniz de yanlarına gelir ve dahil olur.

Aru siparişleri kağıda yazıp Uyum Cafe çalışanlarından birine verir ve kağıtta yazılanları sipariş etmesini rica eder. Cafe çalışanı dönerciye gidip (axios ile bir servis çağrısı yapar) siparişleri verir. (Transaction oluşturulur ve aktarılır. Siparişi veren taraf paketi alacağı için dönercinin kuryesine, yani websocket'e ihtiyaç duyulmaz.)

Aru (Bey): Sebzesiz, çift ekmek, ayran

Eren (Bey): Soğansız, ayran

Deniz (Hanım): Her şeyi bol, acılı, şalgam

Dönerlerin hazırlanabilmesi için, dönerci tarafında siparişi alan kişi(Gateway) siparişleri ustaya (Persist) verir. Usta dönerleri yaptıktan sonra sipariş (Gateway tarafından) paketlenir.


Paketleme işi bittikten sonra Uyum Cafe çalışanı siparişleri alıp geri döner.  

Aru'nun annesi Umay (Redux) "Yine döner yiyeceksiniz anlaşılan." der ve "Bu sefer dönerlerinizi dağıtırken hata yapmayacağım." deyip tebessüm eder. Paketi eline alıp siparişleri kontrol eder (Switch-Case) ve dağıtmaya başlar. 


"Her şeyi bol, acılı, şalgam siparişini yine Deniz vermiş olmalı." der ve Deniz; "Evet bu sefer doğru." diyerek tebessüm eder. Umay; "O halde, BUYUR_DENİZ" der.

"Sebzesiz, çift ekmek, ayran ise Aru'nun siparişi olmalı." der ve Aru; "Evet, her zamanki gibi." der. Umay; "O halde, BUYUR_ARU" der.

"Geriye bir tane kaldığına göre o da Eren'in olmalı." de ve "O halde, BUYUR_EREN" der.

       clientreactchat{
                  componentDidMount {
                        fetchData-> ChannelContentAction.js { channelContentsFetchData { axios } } 
                      }
                  
                  } 
                    -> gateway(kanaladı, sayfasayısı) 
                      ->  persist(mesajlistesi) 
                         ->gateway(mesajlistesi)
                           ->clientreactchat {
                                  ChannelContentAction.js {
                                  componentDidMount(){
                                      channelContentsFetchData() { 
                                                                    axios {
                                                                                                                                                                                          dispatch(getChannelContentsAction(contents))) 
                                                                                                                                                                                            ~ChannelContentReducer.js {channelContentReducer () }
                                                                                                                                                                                          
                                                                                                                                                                                              }
                                                                                      } 
                                                          } 
                                               }                               
                                         }


not: 

dispatch, bir aksiyonu Reducer'a ileten fonksiyon. 

getChannelContentsAction ise, GET_CHANNEL_CONTENTS türünde bir Action yaratıyor. Bu türü taşıyan Reducer çağrılıyor.

# Piyano metaforu ile Redux olayını anlatalım.
 

 Redux= Piyanist.
 
 Store= Piyano
 
 Action= Nota (Mesela "Do" notası) 
 
 Reducer= Tuş
 
 
 Nota kağıdına bakmak=  Bir servis çağırmak. Yani, nota kağıdındaki müziği piyanoya aktarma işlemini (action) başlatmak.
 Mesela "Do" notası görüldü, piyanoda "Do" tuşuna (reducer) basılacaktır.
 
 Tuşlara basmak=  Herhangi bir servis çağırarak, store'un (piyanonun) o ânki hâlini (ritmini) değiştirmek.
 
 # COMPONENTLERİN TASLAĞI
 
  ![Image of Higher level relations](https://github.com/helpfulfamily/clientreactchat/blob/master/componentdraft.jpg?raw=true)
