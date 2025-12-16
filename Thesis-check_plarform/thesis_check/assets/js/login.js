// Sayfanın tamamen yüklendiğinden emin ol
document.addEventListener('DOMContentLoaded', function() {

    // HTML'deki login formunu ve alanlarını seç
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Forma "submit" (gönder) olayı ekle
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Sayfanın yeniden yüklenmesini engelle

        // Alanlardaki verileri al
        const username = usernameInput.value;
        const password = passwordInput.value;

        // DİKKAT: Bu URL'in backend'indeki login adresi olduğundan emin ol!
        // Genellikle /api/token/ veya /api/login/ gibi bir adres olur.
        const loginApiUrl = 'http://127.0.0.1:8000/api/login/'; // <-- BURAYI KONTROL ET!

        // Backend'e fetch (istek) gönder
        fetch(loginApiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': username,
                'password': password
            })
        })
        .then(response => {
            if (response.ok) {
                return response.json(); // Başarılıysa, cevabı JSON olarak al
            } else {
                // Hata varsa (örn: 401 Unauthorized)
                throw new Error('Kullanıcı adı veya şifre hatalı!');
            }
        })
        .then(data => {
            // Backend'den "token" (yetki anahtarı) gibi bir şey geldiyse
            // Onu tarayıcı hafızasına kaydedelim (gelecekteki işlemler için)
            if (data.token) {
                localStorage.setItem('token', data.token);
            }
            
            // -------- EN ÖNEMLİ KISIM --------
            // Giriş başarılı! Kullanıcıyı ana sayfaya (tez yükleme) yönlendir.
            window.location.href = 'index.html';
            // ------------------------------------

        })
        .catch(error => {
            // Hata olursa kullanıcıya uyar
            console.error('Giriş hatası:', error);
            alert(error.message);
        });
    });
});