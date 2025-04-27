const games = [
  {
    id: 'jan-ken',
    name: 'Джан-Кен',
    description: 'Камень-ножницы-бумага?',
    image: 'images/janken.png',
    completed: false,
    wins: 0
  },
  {
    id: 'menko',
    name: 'Мэнко',
    description: 'Переверни все карточки!',
    image: 'images/menko.png',
    completed: false,
    wins: 0
  },
  {
    id: 'ohajiki',
    name: 'Охаджики',
    description: 'Сможешь победить?',
    image: 'images/ohajiki.png',
    completed: false,
    wins: 0
  }
];

let currentGame = null;

function showMainPage() {
  const app = document.getElementById('app');
  app.innerHTML = `<div class="header-container"><h1>Японские мини-игры!!</h1></div><div class = "text-container"><p align = "center">🏮 Добро пожаловать в мир японских мини-игр! 🏮
    Открой для себя три классические игры, в которые веками играли в Японии!<p><p align = "center">
    Проверь свою ловкость, удачу и мастерство — и собери все победы, чтобы разблокировать секретный подарок.
    Сможешь ли ты пройти испытания и получить особенный японский рецепт? 🌸🎌<p><p align = "center">
    
    Нажми на любую игру, чтобы начать!<p></div><div class="card-container"></div>`;

  const cardContainer = document.querySelector('.card-container');

  games.forEach(game => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${game.image}" alt="${game.name}">
      <h2>${game.name}</h2>
      <p>${game.description}</p>
      <p>${game.completed ? "✅ Пройдено" : ""}</p>
    `;
    card.onclick = () => startGame(game.id);
    cardContainer.appendChild(card);
  });

  if (games.every(game => game.completed)) {
    const secretCard = document.createElement('div');
    secretCard.className = 'card';
    secretCard.innerHTML = `
      <img src="images/secret.jpg" alt="?">
      <h2>???</h2>
      <p>???</p>
    `;
    secretCard.onclick = showRecipe;
    cardContainer.appendChild(secretCard);
  }
}

function startGame(gameId) {
  currentGame = games.find(g => g.id === gameId);
  if (!currentGame) return;

  if (gameId === 'jan-ken') {
    startJanKen();
  } else if (gameId === 'menko') {
    startMenko();
  } else if (gameId === 'ohajiki') {
    startOhajiki();
  }
}

function userWins(gameId) {
  const game = games.find(g => g.id === gameId);
  if (!game) return;
  
  game.wins++;
  if (game.wins >= 3) {
    game.completed = true;
    alert('🎉 Вы прошли игру!');
    showMainPage();
  } else {
    alert(`Ура! Осталось выиграть ${3 - game.wins} раз(а)`);
  }
}

// 🎮 Jan-Ken (Rock-Paper-Scissors)
function startJanKen() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h2>Джан-Кен(Rock-Paper-Scissors)</h2>
    <p><div class = "text-container">Джан-Кен — это японская версия знаменитой игры "Камень, ножницы, бумага", но здесь это не просто детская забава.<br>
В Японии джан-кен используется, чтобы принимать решения, решать споры и даже определять победителей в конкурсах!<br>
Правила просты: камень бьёт ножницы, ножницы режут бумагу, бумага накрывает камень.<br>
Проверь свою интуицию и реакцию — сможешь ли ты одержать три уверенные победы подряд?</div></p>
    <div class="choices">
      <button onclick="playJanKen('rock')">
        <img src="images/rock.jpg" class="choice-img" alt="Rock">
      </button>
      <button onclick="playJanKen('paper')">
        <img src="images/paper.jpg" class="choice-img" alt="Paper">
      </button>
      <button onclick="playJanKen('scissors')">
        <img src="images/scissors.jpg" class="choice-img" alt="Scissors">
      </button>
    </div>
    <p id="result"></p>
    <button onclick="showMainPage()">Обратно</button>
  `;
}

function playJanKen(userChoice) {
  const choices = ['rock', 'paper', 'scissors'];
  const computerChoice = choices[Math.floor(Math.random() * choices.length)];
  let resultText = "";

  if (userChoice === computerChoice) {
    resultText = "Ничья!";
  } else if (
    (userChoice === 'rock' && computerChoice === 'scissors') ||
    (userChoice === 'paper' && computerChoice === 'rock') ||
    (userChoice === 'scissors' && computerChoice === 'paper')
  ) {
    resultText = "Ура, вы выиграли!"
    userWins('jan-ken');
  } else {
    resultText = "Вы проиграли :(";
  }

  document.getElementById('result').innerText = resultText;
}

// 🎮 Menko (Card Flip)
function startMenko() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h2>Мэнко</h2>
    <p><div class = "text-container">Мэнко — древняя японская игра, в которую играли ещё в эпоху Эдо. <br>
У каждого игрока есть картонные или деревянные карточки с яркими рисунками. <br>
Цель — броском своей карты сбить карту соперника с пола, используя силу и точный приём. <br>
Эта игра требует не только силы, но и хитрости: какой угол выбрать? Какой силы ударить? <br>
Покажи свою меткость и стратегию — и одержи три победы, чтобы доказать своё мастерство!</div></p>
    <button onclick="playMenko()">Перевернуть карту!</button>
    <p id="menko-result"></p>
    <button onclick="showMainPage()">Обратно</button>
  `;
}

function playMenko() {
  const userPower = Math.floor(Math.random() * 10) + 1;
  const opponentPower = Math.floor(Math.random() * 10) + 1;
  let resultText = "";

  if (userPower > opponentPower) {
    resultText = "У тебя получилось перевернуть карту противника!";
    userWins('menko');
  } else if (userPower === opponentPower) {
    resultText = "Попробуй снова";
  } else {
    resultText = "Не получилось :(";
  }

  document.getElementById('menko-result').innerText = resultText;
}

// 🎮 Ohajiki (Flick Disc)
function startOhajiki() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h2>Охаджики</h2>
    <p><div class = "text-container">Click to flick and collect a disc!Охаджики — это нежная и красивая игра, в которую традиционно играли японские дети, особенно девочки. <br>
Маленькие плоские камешки или стеклянные фишки раскладываются на полу, а игроки щелчком выбивают цели. <br>
Здесь важна не сила, а аккуратность и точность движений. <br>
Сможешь ли ты набрать достаточно очков, метко выбивая камешки? Попробуй свои силы и выиграй трижды!</div></p>
    <button onclick="playOhajiki()">Выбить!</button>
    <p id="ohajiki-result"></p>
    <button onclick="showMainPage()">Обратно</button>
  `;
}

function playOhajiki() {
  const success = Math.random() > 0.4;

  let resultText = "";

  if (success) {
    resultText = "Ура!";
    userWins('ohajiki');
  } else {
    resultText = "Попробуй снова!";
  }

  document.getElementById('ohajiki-result').innerText = resultText;
}

// 🍳 Secret Reward - Recipe
function showRecipe() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <h2>Секретный рецепт: Тамагояки 🍳</h2>
    <img src="images/tamagoyaki.jpg" alt="Tamagoyaki" class="recipe-img">
    <div class = "text-container"><p><strong>Ингредиенты</strong><br>
    Куриные яйца - 5 шт<br>
Растительное масло - 1 столовая ложка<br>
Соевый соус  - 1  стол.л. <br>
Рисовый уксус  (по возможности лучше взять рисовое вино мирин)  - 1 стол.л. <br>
Сахар - 1 чайн.л. </p>
    <p><strong>Рецепт</strong><br>
    1. Вбейте яйца в глубокую миску. <br>
2. Взбейте яйца венчиком до однородности, пока белки и желтки не смешаются.<br>
3. Процедите взбитые яйца через сито, чтобы удалить лишние частицы и добиться гладкой консистенции.<br>
4. Добавьте в яйца соевый соус, рисовый уксус и сахар. Хорошо перемешайте, чтобы сахар полностью растворился.<br>
5. Нагрейте сковороду с небольшим количеством масла на среднем огне.<br>
6. Влейте небольшое количество яичной смеси на сковороду и равномерно распределите ее круговыми движениями.<br>
7. Когда омлет начнёт схватываться, аккуратно сверните его в рулет, начиная с одного края сковороды.<br>
8. Повторите процесс: добавьте ещё немного смеси на сковороду, дождитесь, пока она схватится, и снова сверните омлет. Так делайте несколько раз, формируя слои.<br>
9. Когда омлет полностью приготовлен, аккуратно вытащите его из сковороды и нарежьте на порционные кусочки.<br>
10. Украсьте омлет по своему вкусу и подавайте к столу.</p></div>
    <button onclick="showMainPage()">Обратно</button>
  `;
}

// Start the app
showMainPage();
