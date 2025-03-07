const tokenBot = "7920514777:AAFwGR_cZ_lM-4bj-06ewMZwZSjsAjkW3ik"; // Ganti dengan token bot kamu
const linkFF = "https://contoh-link-ff.com"; // Ganti dengan link yang diinginkan

function handleStartCommand(chatId) {
    fetch(`https://api.telegram.org/bot${tokenBot}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text: "Klik tombol di bawah untuk mendapatkan link.",
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "🎮 Free Fire",
                            callback_data: "free_fire"
                        }
                    ]
                ]
            }
        })
    })
    .then(res => res.json())
    .then(data => console.log("Tombol terkirim:", data))
    .catch(error => console.error("Error:", error));
}

function handleButtonClick(callbackQuery) {
    const chatId = callbackQuery.message.chat.id;

    fetch(`https://api.telegram.org/bot${tokenBot}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text: `Selamat datang! Silahkan salin link ini:\n\n${linkFF}`
        })
    })
    .then(res => res.json())
    .then(data => console.log("Pesan terkirim:", data))
    .catch(error => console.error("Error:", error));
}

// Cek pesan terbaru untuk menangkap perintah /start dan tombol yang ditekan
function cekPesan() {
    fetch(`https://api.telegram.org/bot${tokenBot}/getUpdates`)
        .then(response => response.json())
        .then(data => {
            if (data.result.length === 0) return;

            let pesanTerakhir = data.result[data.result.length - 1];

            if (pesanTerakhir.message) {
                let chatId = pesanTerakhir.message.chat.id;
                let teksPesan = pesanTerakhir.message.text;

                if (teksPesan === "/start") {
                    handleStartCommand(chatId);
                }
            } else if (pesanTerakhir.callback_query) {
                handleButtonClick(pesanTerakhir.callback_query);
            }
        })
        .catch(error => console.error("Error:", error));
}

// Jalankan cek setiap beberapa detik
setInterval(cekPesan, 5000);
