const yeniGorev = document.querySelector('.input-gorev');
const yeniGorevEkleBtn = document.querySelector('.btn-gorev-ekle');
const gorevListesi = document.querySelector('.gorev-listesi');

yeniGorevEkleBtn.addEventListener('click', gorevEkle);
gorevListesi.addEventListener('click', gorevSilTamamla);

document.addEventListener('DOMContentLoaded', localStorageOku);

function gorevSilTamamla(e) {
    const tiklanilanEleman = e.target;

    if (tiklanilanEleman.classList.contains('gorev-btn-tamamlandi')) {
        tiklanilanEleman.parentElement.classList.toggle('gorev-tamamlandi');
    }
    if (tiklanilanEleman.classList.contains('gorev-btn-sil')) {
        if (confirm('Emin misiniz?')) {
            tiklanilanEleman.parentElement.classList.toggle('kaybol');

            const silinecekGorev = tiklanilanEleman.parentElement.children[0].innerText;
            localStorageSil(silinecekGorev);

            tiklanilanEleman.parentElement.addEventListener('transitionend', function () {
                tiklanilanEleman.parentElement.remove();
            });
        }
    }
}

function gorevEkle(e) {
    e.preventDefault();

    if (yeniGorev.value.length > 0) {
        gorevItemOlustur(yeniGorev.value);

        //local storage'a kaydet
        localStorageKaydet(yeniGorev.value);
        yeniGorev.value = '';
    } else {
        alert('Lütfen alana bilgi girişi yapınız ');
    }
}

function localStorageArrayeDonustur() {
    let gorevler;

    if (localStorage.getItem('gorevler') === null) {
        gorevler = [];
    } else {
        gorevler = JSON.parse(localStorage.getItem('gorevler'));
    }
    return gorevler;
}

function localStorageKaydet(yeniGorev) {
    let gorevler = localStorageArrayeDonustur();
    gorevler.push(yeniGorev);
    localStorage.setItem('gorevler', JSON.stringify(gorevler));
}

function localStorageOku() {
    let gorevler = localStorageArrayeDonustur();
    gorevler.forEach(function (gorev) {
        gorevItemOlustur(gorev);
    });
}

function gorevItemOlustur(gorev) {
    //div oluşturma
    const gorevDiv = document.createElement('div');
    gorevDiv.classList.add('gorev-item');

    //li oluşturma
    const gorevLi = document.createElement('li');
    gorevLi.classList.add('gorev-tanim');
    gorevLi.innerText = gorev;

    gorevDiv.appendChild(gorevLi);

    //tamamlandı butonu ekle
    const gorevTamamlandiBtn = document.createElement('button');
    gorevTamamlandiBtn.classList.add('gorev-btn');
    gorevTamamlandiBtn.classList.add('gorev-btn-tamamlandi');
    gorevTamamlandiBtn.innerHTML = '<i class="fa-regular fa-square-check"></i>';
    gorevDiv.appendChild(gorevTamamlandiBtn);

    //sil butonu ekle
    const gorevSilBtn = document.createElement('button');
    gorevSilBtn.classList.add('gorev-btn');
    gorevSilBtn.classList.add('gorev-btn-sil');
    gorevSilBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    gorevDiv.appendChild(gorevSilBtn);

    //ul'ye oluşturduğumuz div'i ekleyelim
    gorevListesi.appendChild(gorevDiv);
}

function localStorageSil(gorev) {
    let gorevler = localStorageArrayeDonustur();

    //splice ile item sil
    const silinecekElemanIndex = gorevler.indexOf(gorev);
    gorevler.splice(silinecekElemanIndex, 1);

    localStorage.setItem('gorevler', JSON.stringify(gorevler));
}
