document.addEventListener("DOMContentLoaded", function() {
    
    const uploadForm = document.getElementById("uploadForm");
    const fileInput = document.getElementById("thesisFile");
    const submitButton = uploadForm.querySelector("button[type='submit']");
    const resultArea = document.getElementById("resultArea");

    uploadForm.addEventListener("submit", function() {
        if (fileInput.files.length === 0) {
            alert("Please select a file first."); 
            return; // prevent submission only if no file
        }

        // Show uploading spinner
        submitButton.disabled = true;
        submitButton.innerHTML = `
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            Uploading...
        `;
    });

});
