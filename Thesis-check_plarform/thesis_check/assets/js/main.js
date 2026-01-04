document.addEventListener('DOMContentLoaded', function() {

    const uploadForm = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');
    const submitButton = document.getElementById('submit-button');
    const loadingSpinner = document.getElementById('loading-spinner');
    const successAlert = document.getElementById('success-alert');


    uploadForm.addEventListener('submit', function(event) {
        event.preventDefault();

        loadingSpinner.style.display = 'block';
        successAlert.style.display = 'none';
        submitButton.disabled = true;

        const formData = new FormData();
        formData.append('file', fileInput.files[0]);

        fetch('http://127.0.0.1:8000/api/check/', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            loadingSpinner.style.display = 'none';
            submitButton.disabled = false;
            
            if (response.ok) {

                successAlert.style.display = 'block';
                uploadForm.reset();
                return response.json();
            } else {
                successAlert.style.display = 'none';
                alert('Dosya yüklenirken bir hata oluştu.');
                throw new Error('Upload failed');
            }
        })
        .then(data => {
            console.log('Başarılı:', data);
        })
        .catch(error => {
            console.error('Hata:', error);
            loadingSpinner.style.display = 'none';
            submitButton.disabled = false;
        });
    });

});