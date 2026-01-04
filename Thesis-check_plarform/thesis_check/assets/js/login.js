document.addEventListener('DOMContentLoaded', function() {


    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = usernameInput.value;
        const password = passwordInput.value;

        const loginApiUrl = 'http://127.0.0.1:8000/api/login/';

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
                return response.json();
            } else {
                throw new Error('Kullanıcı adı veya şifre hatalı!');
            }
        })
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            window.location.href = 'index.html';

        })
        .catch(error => {
            console.error('Giriş hatası:', error);
            alert(error.message);
        });
    });
});