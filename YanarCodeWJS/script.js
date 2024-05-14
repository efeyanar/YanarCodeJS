 
        //POPUP
        setTimeout(function() {
            document.getElementById('popup-box').classList.remove('is-hide'); 
            //is-hide classı visibility : hidden remove edilir,görünür hale gelir
            document.body.className += " popup-flow-box"                      
        }, 3000); //3 saniyede ortaya çıkar
        //çarpı butonunda da remove edilen is-hide aktif edilir.
        function removeClassonBody() {
            var element = document.body;
            element.className = element.className.replace(/\bpopup-flow-box\b/g, "")
        }
        //

        //SCROLL
        window.addEventListener("scroll", scrollBar); //scrollu takip eder

        function scrollBar() { //scrollbar hareket edince fonksiyon aktifleşir
        var winScroll = document.body.scrollTop || document.documentElement.scrollTop; //piksel cinsinden sayfanın yüksekliğini ölçer
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        //Sayfanın toplam yüksekliğinden pencerenin yüksekliğini çıkararak kaydırma mesafesini ölçer.
        var scrolled = (winScroll / height) * 100; //Bu mesafeyi yüzdeliğe çevirir.
        document.getElementById("progress").style.width = scrolled + "%";
        //üstteki yüzde değerini progress id’sine atar. Htmldeki divleri csste boyamaya başlar.
}

        //Scroll Buton
        window.addEventListener("scroll", function() { //scrollu takip eder ve fonksiyonu çalıştırır. 
        var scrollButton = document.getElementById("scrollBtn");
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollButton.style.display = "block"; 
        } else {
        scrollButton.style.display = "none";
        }
        });
        //Eğer yukarıdan 20 piksellik boşluk varsa display block, yoksa display none butonun görünüp görünmemesi için. 

        document.getElementById("scrollBtn").addEventListener("click", function() {
        scrollToTop();
        });

        function scrollToTop() {
        var position = document.body.scrollTop || document.documentElement.scrollTop;
        if (position) {
            window.scrollBy(0, -Math.max(1, Math.floor(position / 10))); //Eksi yönde kaydırma hızını belirler. 10'da 1'i kadar.
            setTimeout(scrollToTop, 15); //15 ms bir kontrol eder.
        }
        }

        /* /* Scroll Buton Titreme */

       /*  window.addEventListener("scroll", function() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollButton.style.display = "block";
        } else {
            scrollButton.style.display = "none";
        }
        });

        document.getElementById("scrollBtn").addEventListener("click", function() {
        scrollToTop();
        });


        setInterval(function() {
        vibrate();
        }, 3000);

        function vibrate() {
        scrollButton.style.transform = "translateX(5px)";
        setTimeout(function() {
            scrollButton.style.transform = "translateX(-5px)";
            setTimeout(function() {
            scrollButton.style.transform = "translateX(0)";
            }, 50);
        }, 50);
        } */ 
        /////////////////////SEPET

// Ürün ekleme butonlarına dinamik olarak olay ekleyelim
document.querySelectorAll('.ekleButonu').forEach(function(button) { //tüm ekleButonu sınıfına sahip öğeleri seçer.
    button.addEventListener('click', function() { //kullanıcı tıkladığında bu fonksiyon devreye girer.
        var urunAdi = this.parentElement.querySelector('h3').textContent; //seçilen butonların h3 başlığını seçer ve urunAdi değişkenine atar.
        ekleSepete(urunAdi); // Sepete ekleme işlevini çağırır.
    });
});

// Sepet butonuna tıklandığında sepeti görünür hale getir
document.getElementById('sepetButonu').addEventListener('click', function() {
    var sepet = document.getElementById('sepet');
    sepet.style.display = 'block'; // Sepetin display özelliğini block haline getirir. 
});

// Sepetten çıkarma butonlarına dinamik olarak olay ekleyelim
document.getElementById('sepet').addEventListener('click', function(event) {
    if (event.target.classList.contains('cikarButonu')) { //Eğer cikarButonuna tıklandıysa {
        var urunAdi = event.target.parentElement.querySelector('span').textContent; //span elementinin içindekileri seç ve urunAdi'na ata.
        cikarSepetten(urunAdi); // urunAdi'nı epetten çıkar.
    }
});

// Kapatma butonuna ve Onayla butonuna tıklandığında sepeti gizle
document.getElementById('kapatButonu').addEventListener('click', function() {
    var sepet = document.getElementById('sepet');
    sepet.style.display = 'none';
});

document.getElementById('onaylaButonu').addEventListener('click', function(){
    var sepet = document.getElementById('sepet');
    sepet.style.display= 'none';
})
//

var onaylamaButonu = document.getElementById('onaylaButonu');
onaylamaButonu.addEventListener('click', function() {
    
    var sepet = document.getElementById('sepet');
    let email = prompt("Sizinle İletişime Geçebilmemiz İçin E-Mail Adresinizi Giriniz : ");

// E-posta adresi doğrulama için bir regex kullanma
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let mailRegex = /^[a-zA-Z0-9._%+-]+@(hotmail|outlook|gmail|yanarcode)\.com$/;
let turkishCharRegex = /[ığüşöçİĞÜŞÖÇ]/;

// Girilen metni emailRegex ile karşılaştırma
if (emailRegex.test(email) && !turkishCharRegex.test(email) && mailRegex.test(email)) {
    function randomDogrulamaKodu(length) {
        var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Kullanılacak karakterler
        var randomCode = ''; // Rastgele doğrulama kodu
    
        for (var i = 0; i < length; i++) {
            var randomIndex = Math.floor(Math.random() * chars.length); // Rastgele bir indeks seç
            randomCode += chars[randomIndex]; // Seçilen karakteri doğrulama koduna ekle
        }
    
        return randomCode; // Oluşturulan doğrulama kodunu döndür
    }
    
    // Örnek olarak 6 karakter uzunluğunda bir doğrulama kodu oluştur
    var dogrulamaKodu = randomDogrulamaKodu(6);
    let kontrol = prompt("Robot Olmadığınızı Doğrulayın : " + dogrulamaKodu);
    if (kontrol == dogrulamaKodu) {
        alert('Sepetiniz Onaylanmıştır. İstediğiniz Zaman Değişiklik Yapabilirsiniz. Sizinle ' + email + ' Adresinden İletişime Geçilecektir.');
    }
    else{
        alert('Doğrulama Kodunu Yanlış Girdiniz.')
    }
} else {
    alert("Hatalı Email Girişi Yaptınız.");
}
    
});


function ekleSepete(urunAdi) {
    var sepetListesi = document.getElementById('sepetListesi');
    var yeniUrun = document.createElement('li');
    yeniUrun.innerHTML = '<span>' + urunAdi + '</span> <button class="cikarButonu">SEPETTEN ÇIKAR</button>';
    sepetListesi.appendChild(yeniUrun);
}

function cikarSepetten(urunAdi) {
    var sepetListesi = document.getElementById('sepetListesi');
    var urunler = sepetListesi.getElementsByTagName('li');
    for (var i = 0; i < urunler.length; i++) {
        if (urunler[i].querySelector('span').textContent === urunAdi) {
            urunler[i].remove(); // Ürünü listeden çıkar
            break;
        }
    }
    /* // Eğer sepet boş ise sepeti gizle
    if (sepetListesi.childElementCount === 0) {
        var sepet = document.getElementById('sepet');
        sepet.style.display = 'none';
    } */
}





//Sepet Butonu Titremesi
var button = document.getElementById('sepetButonu');

    function shakeButton() {
        var left = parseInt(window.getComputedStyle(button).getPropertyValue('left'));
        var distance = 5;
        
        // Titreme efekti
        button.style.left = (left + distance) + 'px';
        setTimeout(function() {
            button.style.left = (left - distance) + 'px';
            setTimeout(function() {
                button.style.left = left + 'px';
            }, 100);
        }, 100);
    }

    setInterval(shakeButton, 3000);

    //Kaydırma
    document.querySelectorAll('a.gezintilink').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Sayfanın varsayılan davranışını engelle
    
            const targetId = this.getAttribute('href'); // Hedef elementin ID'sini al
            const targetElement = document.querySelector(targetId); // Hedef elementi seç
    
            // Hedef elemente yavaşça kaydırma işlemi
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth' // Yavaşça kaydırma efekti
            });
        });
    });
    
    document.querySelectorAll('a.logolink').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Sayfanın varsayılan davranışını engelle
    
            const targetId = this.getAttribute('href'); // Hedef elementin ID'sini al
            const targetElement = document.querySelector(targetId); // Hedef elementi seç
    
            // Hedef elemente yavaşça kaydırma işlemi
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth' // Yavaşça kaydırma efekti
            });
        });
    });