// API для отправки заявок в Telegram
// Токен прямо в коде — никаких настроек не нужно!

const TOKEN = '8526511994:AAEIU76j5fenVueuLFHUaTss2kFkPe5xVn4';
const CHAT_ID = '8315588207';

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nick, telegram } = req.body;

  if (!nick || !telegram) {
    return res.status(400).json({ error: 'Nick and Telegram required' });
  }

  const message = `🎮 <b>НОВАЯ ЗАЯВКА НА АЛЬФА-ТЕСТ</b>

👤 <b>Ник:</b> ${nick}
📱 <b>Telegram:</b> @${telegram.replace('@', '')}
🕐 <b>Дата:</b> ${new Date().toLocaleString('ru-RU')}
🌐 <b>Сайт:</b> Strike Pixel`;

  try {
    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    const data = await response.json();

    if (data.ok) {
      return res.status(200).json({ success: true, message: 'Заявка отправлена!' });
    } else {
      return res.status(500).json({ error: 'Telegram error', details: data });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
};
