const grid = document.getElementById('game-grid');
const search = document.getElementById('search');
const player = document.getElementById('player');
const frame = document.getElementById('game-frame');
const title = document.getElementById('current-title');

let gamesData = [];

// Load games from JSON
fetch('games.json')
    .then(res => res.json())
    .then(data => {
        gamesData = data;
        displayGames(gamesData);
    });

function displayGames(games) {
    grid.innerHTML = '';
    games.forEach(game => {
        const div = document.createElement('div');
        div.className = 'card';
        div.innerHTML = `
            <img src="${game.thumb}">
            <p>${game.title}</p>
        `;
        div.onclick = () => {
            title.innerText = game.title;
            frame.src = game.url;
            player.style.display = 'block';
        };
        grid.appendChild(div);
    });
}

// Search Logic
search.oninput = () => {
    const filtered = gamesData.filter(g => 
        g.title.toLowerCase().includes(search.value.toLowerCase())
    );
    displayGames(filtered);
};

function closeGame() {
    player.style.display = 'none';
    frame.src = '';
}
