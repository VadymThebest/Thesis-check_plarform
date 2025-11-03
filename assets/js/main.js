// Bu kod, tüm HTML sayfası yüklendikten sonra çalışır
document.addEventListener('DOMContentLoaded', function() {

    // HTML'deki elemanları seçiyoruz
    const uploadForm = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');
    const submitButton = document.getElementById('submit-button');
    const loadingSpinner = document.getElementById('loading-spinner');
    const successAlert = document.getElementById('success-alert');

    // Forma "submit" (gönder) dendiğinde ne olacağını belirliyoruz
    uploadForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Sayfanın yeniden yüklenmesini engelle

        // Yükleniyor... animasyonunu göster, başarı mesajını gizle
        loadingSpinner.style.display = 'block';
        successAlert.style.display = 'none';
        submitButton.disabled = true; // Butonu geçici olarak devre dışı bırak

        // Form verilerini hazırlıyoruz
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        // Backend'e (Django) isteği yolluyoruz
        // DİKKAT: Django sunucun 'http://127.0.0.1:8000/api/check/' adresinde olmalı
        fetch('http://127.0.0.1:8000/api/check/', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            // Sunucudan cevap gelince (iyi veya kötü)
            loadingSpinner.style.display = 'none'; // Yükleniyor... animasyonunu gizle
            submitButton.disabled = false; // Butonu tekrar aktif et
            
            if (response.ok) {
                // Başarılıysa
                successAlert.style.display = 'block'; // Başarı mesajını göster
                uploadForm.reset(); // Formu sıfırla
                return response.json(); // Gelen JSON verisini bir sonraki adıma ilet
            } else {
                // Hata varsa
                successAlert.style.display = 'none';
                alert('Dosya yüklenirken bir hata oluştu.');
                throw new Error('Upload failed');
            }
        })
        .then(data => {
            // Başarılı cevaptan sonra gelen veriyi konsola yazdır
            console.log('Başarılı:', data);
        })
        .catch(error => {
            // Ağ hatası veya başka bir hatayı yakala
            console.error('Hata:', error);
            loadingSpinner.style.display = 'none'; // Hata durumunda da spinner'ı gizle
            submitButton.disabled = false; // Butonu tekrar aktif et
        });
    });

});