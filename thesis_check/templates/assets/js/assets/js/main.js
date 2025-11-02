document.addEventListener("DOMContentLoaded", function() {
    
    const uploadForm = document.getElementById("uploadForm");
    const fileInput = document.getElementById("thesisFile");
    const submitButton = uploadForm.querySelector("button[type='submit']");
    const resultArea = document.getElementById("resultArea");

    uploadForm.addEventListener("submit", function(event) {
        
        if (fileInput.files.length === 0) {
            // DEĞİŞTİ (Uyarı metni)
            alert("Please select a file first."); 
            event.preventDefault();
            return;
        }

        submitButton.disabled = true;
        // DEĞİŞTİ (Buton metni)
        submitButton.innerHTML = `
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Uploading...
        `;

        event.preventDefault(); 
        setTimeout(function() {
            submitButton.disabled = false;
            // DEĞİŞTİ (Buton metni)
            submitButton.innerHTML = "Check File"; 
            resultArea.style.display = "block";
        }, 2000); 

    });

});