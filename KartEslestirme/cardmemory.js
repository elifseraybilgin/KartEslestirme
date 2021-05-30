const planetkartdizi = ["sun", "merkur", "venus", "dunya", "mars", "jupiter", "saturn", "uranus","neptun","pluto","astronot","mekik"];
const jobskartdizi = ["mimar", "avukat", "carpenter", "chef", "computer", "dentist", "doctor", "fire","mechanic","muzisyen","pilot","teacher"];
const oceankartdizi = ["balik1", "balik2", "balik3", "balik4", "balik5", "balik6", "balik7", "balik8", "balik9", "balik10", "balik11", "balik12"];
let displaykartdizi = [];
let aktifkartdizi = planetkartdizi;

const kolayScoresdizi = [13, 16, 19, 22, 25];
const ortaScoresdizi = [15, 20, 25, 30, 35];
const zorScoresdizi = [17, 24, 31, 38, 45];

let cevirmeSayisi = 0;
let donusSayisi = 0;
let countSelected = 0;

let userName = localStorage.getItem("userName");
let userAvatar = localStorage.getItem("userAvatar");

let kolayScore = 0;
let ortaScore = 0;
let zorScore = 0;
let aktifScore = 0;

let kolayHighScore = 0;
let ortaHighScore = 0;
let zorHighScore = 0;
let aktifHighScore = kolayHighScore;

const dashStar = 'dashboard-score-star';
const winStar = 'score-star';
const highWinStar = 'win-modal-score-star';

let sonuc;
var Puan = 0;

var Durdurma=false;
var OyunIciSure;
var timer = null; 
var oyunZamaniMS=120000;


/*------------------------ Oyun Suresi -----------------------*/
// Zamanin Baslamasi
function start() {
    timer = setInterval(function(){
        if(!Durdurma){
            if (oyunZamaniMS <= 0) {
                $('#finishModal').modal('show');} 
            else {
                oyunZamaniMS = oyunZamaniMS - 1000;
                OyunIciSure = "0" + Math.floor(oyunZamaniMS / 60000) + ":" + ((oyunZamaniMS % 60000) / 1000).toFixed(0);
                $(".Sure").text(OyunIciSure);
            }                
        }
    },1000);
}        
// Zamanin Durmasi
function stop() {
    clearInterval(timer);
}   
/*------------------------ Oyun Suresi -----------------------*/

/*------------------- Kullanici Bilgi Giris ------------------*/
//Kullanici Ilk Giris
$('#kullanici-bilgi-submit-button').click(function() {
    KullaniciBilgi();
});
function KullaniciBilgi() {
    userName = $('#username').val();
    userName=userName.toLocaleUpperCase();
    userAvatar = $('input[name=avatarRadios]:checked').val();

    localStorage.setItem("userName", userName);
    localStorage.setItem("userAvatar", userAvatar);

    kullaniciBilgileri();
    
    //kullanici bilgi giris kontrol
    if ((userName && userAvatar) || ((((userAvatar != "avatar-default") && (userName != null) && (userName != "KULLANICI ADI") && (userName != ""))) && (userAvatar))) { 
        $('#kullaniciBilgiModal').modal('hide');
    }
}
function kullaniciBilgileri() {
    $('.username').text(userName);
    switch (userAvatar) {
        case 'girl':
            $('#kResim').addClass('girl').removeClass('avatar-default boy');
            break;
        case 'boy':
            $('#kResim').addClass('boy').removeClass('avatar-default girl');
            break;
        case 'default':
            $('#kResim').addClass('avatar-default').removeClass('girl boy ');
            break;
        default:
            break;
    }
} 
function KullaniciGirisKontrol() {
    if ((userAvatar === "avatar-default") || (userName === null) || (userName === "KULLANICI ADI") || (userName === "")) {
        localStorage.setItem("kolayHighScore", 0);
        localStorage.setItem("ortaHighScore", 0);
        localStorage.setItem("zorHighScore", 0);
        setTimeout(function() {
            $("#kullaniciBilgiModal").modal({
                backdrop: 'static',
                keyboard: false
            });
        }, 500);
    }
    else {
        userName = localStorage.getItem("userName");
        userAvatar = localStorage.getItem("userAvatar");

        kolayHighScore = localStorage.getItem("kolayHighScore");
        ortaHighScore = localStorage.getItem("ortaHighScore");
        zorHighScore = localStorage.getItem("zorHighScore");
        aktifHighScore = kolayHighScore;
        stop();
        start();
        return;
    }
}
/*------------------- Kullanici Bilgi Giris ------------------*/

let ses = false;
/*------------ Butonlara Tiklanildiginda Ses Olayi -----------*/
$('.btn').click(function() {
    playButtonAudio();
});
function playButtonAudio() {
    $('#buttonClickAudio')[0].currentTime = 0;
    $('#buttonClickAudio')[0].play();
}
// Ses Butonu
$('#muteButton').click(function() {
    muteAudio();
});
// https://css-tricks.com/forums/topic/mute-unmute-sounds-on-website/
function muteAudio() {
    let sesler = $('audio');
    if (ses) {
        for (let j = 0; j < sesler.length; j++) {
            sesler[j].muted = false;
        }
        ses = false;
    }
    else {
        for (let j = 0; j < sesler.length; j++) {
            sesler[j].muted = true;
        }
        ses = true;
    }
    $('#muteButton i').toggleClass('fa-volume-off');
}
/*------------ Butonlara Tiklanildiginda Ses Olayi -----------*/

/*---------------------- Kategori Secimi ---------------------*/
$('.planet').click(function() {
    kategoriSecim(planetkartdizi);
});
$('.jobs').click(function() {
    kategoriSecim(jobskartdizi);
});
$('.ocean').click(function() {
    kategoriSecim(oceankartdizi);
});
function kategoriSecim(arr) {
    aktifkartdizi = arr;
    resetGame();
}
/*---------------------- Kategori Secimi ---------------------*/

/*------------------- Oyun Level Butonlari -------------------*/
$('#kolayButton').click(function() {
    kolayButton();
    LevelSecim(kolayHighScore);
});
$('#ortaButton').click(function() {
    ortaButton();
    LevelSecim(ortaHighScore);
});
$('#zorButton').click(function() {
    zorButton();
    LevelSecim(zorHighScore);
});
function kolayButton() {
    $('.my-card-column-orta, .my-card-column-zor').addClass('invisible').removeClass('visible');
    $('#dashboard-high-score-text').text('Kolay Mod Skor');
}
function ortaButton() {
    $('.my-card-column-orta').addClass('visible').removeClass('invisible');
    $('.my-card-column-zor').addClass('invisible').removeClass('visible');
    $('#dashboard-high-score-text').text('Orta Mod Skor');
}
function zorButton() {
    $('.my-card-column-orta').addClass('visible').removeClass('invisible');
    $('.my-card-column-zor').addClass('visible').removeClass('invisible');
    $('#dashboard-high-score-text').text('Zor Mod Skor');
}
function LevelSecim(score) {
    aktifHighScore = score;
    oyundaYildizGozukmesi(aktifHighScore, dashStar);
    resetGame();
}
/*------------------- Oyun Level Butonlari -------------------*/

/*-----Secilen iki kartın eslesip eslesmedigini kontrolu------*/
//https://stackoverflow.com/questions/40554378/clear-innerhtml-after-5-seconds
function kartKontrol() {
    if ($('.selected').length == 2) {
        let ilkKart = $('.selected').eq(0).find('.flip-card-back').attr('class');
        let ikinciKart = $('.selected').eq(1).find('.flip-card-back').attr('class');
       
        if (ilkKart == ikinciKart) { 
            Puan+=100;
            $('.Puan').text("Puan: " + Puan);
            $('.kartBilgi h5').text("Tebrikler. Doğru Bildiniz.").addClass('visible').removeClass('invisible');
            setTimeout(function(){
                $('.selected').each(function(x) {
                    $(this).removeClass('selected').addClass('matched disabled').addClass('invisible');
                    $('.kartBilgi h5').text("").addClass('invisible').removeClass('visible');        
                    countSelected = 0;
                    cevirmeSayisi++;
                    countTurns();
                    $('#correctBingAudio')[0].play();
                    KazananKontrol();
                    return;      
                });
            },1000);
        }
        else {
            Puan-=20;
            $('.Puan').text("Puan: " + Puan);
            $('.kartBilgi h5').text("Üzgünüm. Yanlış Bildiniz.").addClass('visible').removeClass('invisible');    
            setTimeout(function() {
                $('.selected').each(function(x) {
                    $('.kartBilgi h5').text("").addClass('invisible').removeClass('visible');          
                    $(this).removeClass('face-up selected disabled').addClass('face-down');
                    $('#wrongBingAudio')[0].play();
                    countSelected = 0;
                    cevirmeSayisi++;
                    countTurns();
                });
            },1000);
        }

    }
    else {
        return;
    }
}         
/*-----Secilen iki kartın eslesip eslesmedigini kontrolu------*/

/*------------------Kazanan ve Yildiz Kontrol-----------------*/
/* Levellere Gore Skor Secimi */
function levellereGoreKartSayisi(goruntulenecekKartSayisi) {
    switch (goruntulenecekKartSayisi) {
        case 12:
            return kolayScoresdizi;
        case 18:
            return ortaScoresdizi;
        case 24:
            return zorScoresdizi;
        default:
            break;
    }
}
 function KazananKontrol() {
    let matchedNum = $('.matched').length;
    let visibleNum = $('.visible').length;
    let difficultydizi = [];

    if (matchedNum == visibleNum) {
        stop();
        difficultydizi = levellereGoreKartSayisi(visibleNum);
        aktifScore = SkorKontrolYildiz(difficultydizi);
        if (yuksekSkorKontrol()) {
            $('#YeniYuksekSkorModal').modal('show');
            $('#winAudio')[0].play();
            oyundaYildizGozukmesi(aktifHighScore, highWinStar);
            oyundaYildizGozukmesi(aktifHighScore, dashStar);
            return;
        }
        else {
            oyundaYildizGozukmesi(aktifScore, winStar);
            $('#kazanmaModal').modal('show');
            $('#winAudio')[0].play();
            return;
        }
    }
    else {
        return;
    }
}
function SkorKontrolYildiz(SkorDizi) {
    for (let i = 0; i < 5; i++) {
        if (donusSayisi <= SkorDizi[i]) {
            sonuc = (5 - i);
            break;
        }
    }
    if (SkorDizi === kolayScoresdizi) {
        kolayScore = sonuc;}
    else if (SkorDizi === ortaScoresdizi) {
        ortaScore = sonuc;}
    else if (SkorDizi === zorScoresdizi) {
        zorScore = sonuc;}
    else {
        return;}

    return sonuc;
}
/* Yuksek Skor Kontrol */
function yuksekSkorKontrol() {
    if (kolayScore > kolayHighScore) {
        kolayHighScore = kolayScore;
        aktifHighScore = kolayHighScore;
        localStorage.setItem("kolayHighScore", kolayHighScore);
        return true;
    }
    else if (ortaScore > ortaHighScore) {
        ortaHighScore = ortaScore;
        aktifHighScore = ortaHighScore;
        localStorage.setItem("ortaHighScore", ortaHighScore);
        return true;
    }
    else if (zorScore > zorHighScore) {
        zorHighScore = zorScore;
        aktifHighScore = zorHighScore;
        localStorage.setItem("zorHighScore", zorHighScore);
        return true;
    }
    else {
        return false;
    }
}
/*------------------Kazanan ve Yildiz Kontrol-----------------*/

/*--------------------Oyunun Reset Edilmesi-------------------*/
// Reset butonu
$('.reset-btn').click(function() {
    resetGame();
});
$('#win-modal-close-btn').click(function() {
    resetGame();
    $('#kazanmaModal').modal('hide');
});
$('#high-score-modal-close-btn').click(function() {
    resetGame();
});
/*$('#info').click(function() {
    Durdurma=true;
    stop();
});
$('#infobtn').click(function() {
    Durdurma=false;
    start();
});*/
function resetGame() {
    $('.face-up').addClass('face-down').removeClass('face-up disabled matched selected').removeClass('invisible');
    let num = ToplamkartSayisi();
    let kart = KartDizisi(aktifkartdizi, num);
    setTimeout(function() {
        displaykart(kart);
    }, 500);
    Puan = 0;
    $('.Puan').text("Puan: " + Puan);
    cevirmeSayisi = 0;
    donusSayisi = 0;
    countSelected = 0;
    countTurns();
    $('.Sure').text("02:00");
    oyunZamaniMS = 120000;
    stop();
    start();
}
/*--------------------Oyunun Reset Edilmesi-------------------*/

/*--------------------Kullanicinin Silinmesi------------------*/
$('#deleteDataModal').click(function() {
    $('#kisiKontrolModal').modal('show');
});
$('#confirmResetData').click(function() {
    Durdurma=true;
    stop();
    kullaniciyiSil();
});
function kullaniciyiSil() {
    localStorage.setItem("kolayHighScore", 0);
    localStorage.setItem("ortaHighScore", 0);
    localStorage.setItem("zorHighScore", 0);
    localStorage.setItem("userName", "KULLANICI ADI");
    localStorage.setItem("userAvatar", "default");

    kolayHighScore = localStorage.getItem("kolayHighScore");
    ortaHighScore = localStorage.getItem("ortaHighScore");
    zorHighScore = localStorage.getItem("zorHighScore");
    userName = localStorage.getItem("userName");
    userAvatar = localStorage.getItem("userAvatar");

    aktifHighScore = kolayHighScore;
    kullaniciBilgileri();
    oyundaYildizGozukmesi(aktifHighScore, dashStar);

    $('#kisiKontrolModal').modal('hide');
    KullaniciGirisKontrol();
}
/*--------------------Kullanicinin Silinmesi------------------*/

/*--------------------Oyunda Yildiz Gosterimi-----------------*/ 
function oyundaYildizGozukmesi(numOfStars, className) {
    let StarElems = document.getElementsByClassName(className);

    for (let i = 0; i < numOfStars; i++) {
        if ($(StarElems[i]).hasClass('empty-star')) {
            $(StarElems[i]).addClass('win-star').removeClass('empty-star');
            $(StarElems[i]).attr('title').split().pop();
            $(StarElems[i]).attr('title', 'star');
        }
    }
    for (let i = numOfStars; i < 5; i++) {
        if ($(StarElems[i]).hasClass('win-star')) {
            $(StarElems[i]).addClass('empty-star').removeClass('win-star');
            $(StarElems[i]).attr('title').split().pop();
            $(StarElems[i]).attr('title', 'no star');
        }
    }
}
/*--------------------Oyunda Yildiz Gosterimi-----------------*/ 

/*-------------------------Kart Bolumu------------------------*/
 function TiklamaSayaci() {
    countSelected++;
    if (countSelected <= 2) {
        return true;
    }
    else {
        return false;
    }
}
//Karta Tiklandiginda
$('.flip-card').click(function() {
    if (TiklamaSayaci()) {
        $('#cardFlipAudio')[0].currentTime = 0;
        $('#cardFlipAudio')[0].play();
        if ($(this).hasClass('face-down')) {
            $(this).addClass('face-up disabled selected').removeClass('face-down');
        }
        kartKontrol();
    }
});
//Ekranda Gorunen Kartlar
function displaykart(kart) {
    $('.flip-card-back').each(function(i) {
        let lastClass = $(this).attr('class').split(' ').pop();
        if (lastClass == 'game-card') {
            $(this).addClass('game-card').addClass(kart[i]);}
        else {
            $(this).removeClass(lastClass).addClass(kart[i]);}
    });
}
function KartDizisi(arr, num) {
    let cutdizi = cutDeck(arr, num);
    let CiftKartDizi = ciftkart(cutdizi);
    let randomkartdizi = [];

    for (let i = 0; i < num * 2; i++) {
        let randIndex = Math.floor(Math.random() * CiftKartDizi.length);
        let rand = CiftKartDizi[randIndex];
        CiftKartDizi.splice(randIndex, 1);
        randomkartdizi.push(rand);
    }
    return randomkartdizi;
}
// kac kartin gorunur oldugunu verir. Ona gore goruntulecek resim sayisini dondurur. 
function ToplamkartSayisi() {
    let num = $('.visible').length;
    let imgNum = (num / 2);
    return imgNum;
}
// zorluk seviyelerine gore kart 
function cutDeck(kart, num) {
    let cutkart = kart.slice(0, num);
    return cutkart;
}
// Cift Kartlari Dizide Saklama.
function ciftkart(ckart) {
    let ciftkartdizi = [];

    for (let i = 0; i < 2; i++) {
        ciftkartdizi = ciftkartdizi.concat(ckart);
    }
    return ciftkartdizi;
}
/*-------------------------Kart Bolumu------------------------*/

/*------------------------Donus Sayaci------------------------*/ 
function countTurns() {
    let turnsCounted = ("Dönüş Sayısı: " + donusSayisi);
    if ((cevirmeSayisi % 2) == 0) {
        donusSayisi++;
    }
    $('.DonusSayacı').text(turnsCounted);
}
/*------------------------Donus Sayaci------------------------*/ 

/*------------Sayfa Ilk Acildiginda Varsayılan Ayar-----------*/
displaykartdizi = KartDizisi(jobskartdizi, 12);
displaykart(displaykartdizi);
countTurns();
KullaniciGirisKontrol();
kullaniciBilgileri();
oyundaYildizGozukmesi(aktifHighScore, dashStar);
Puan = 0;
$('.Puan').text("Puan: " + Puan);
/*------------Sayfa Ilk Acildiginda Varsayılan Ayar-----------*/

