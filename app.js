// تخزين البوتات في localStorage
document.addEventListener('DOMContentLoaded', () => {
  const addBotBtn = document.getElementById('addBot');
  const botsContainer = document.getElementById('botsContainer');

  const loadBots = () => {
    botsContainer.innerHTML = '';
    const bots = JSON.parse(localStorage.getItem('bots') || '[]');
    bots.forEach((bot, index) => {
      const card = document.createElement('div');
      card.className = 'bot-card';
      card.innerHTML = `
        <div class="actions">
          <button class="delete">🗑️</button>
          <button class="settings">⚙️</button>
          <button class="power">🟢</button>
        </div>
        <div class="info">
          <strong style="color: ${bot.color};">${bot.name}</strong><br/>
          الحالة: <span style="color: lightgreen;">Online</span><br/>
          روم صوتي:<br/> ${bot.voice}
        </div>
        <img src="${bot.avatar}" alt="bot avatar" />
      `;
      card.querySelector('.delete').onclick = () => {
        bots.splice(index, 1);
        localStorage.setItem('bots', JSON.stringify(bots));
        loadBots();
      };
      botsContainer.appendChild(card);
    });
  };

  addBotBtn.onclick = () => {
    const token = prompt('أدخل توكن البوت:');
    const voice = prompt('أدخل ID الروم الصوتي:');
    if (!token || !voice) return;

    fetch('https://discord.com/api/v10/users/@me', {
      headers: { Authorization: `Bot ${token}` }
    })
    .then(res => res.json())
    .then(data => {
      const bots = JSON.parse(localStorage.getItem('bots') || '[]');
      bots.push({
        name: data.username,
        avatar: `https://cdn.discordapp.com/avatars/${data.id}/${data.avatar}.png`,
        voice,
        color: 'white'
      });
      localStorage.setItem('bots', JSON.stringify(bots));
      loadBots();
    })
    .catch(() => alert('توكن غير صحيح أو البوت لا يعمل'));
  };

  loadBots();
});