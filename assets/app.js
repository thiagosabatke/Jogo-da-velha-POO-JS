const botaoJogar = document.getElementById('play');
const botaoHistorico = document.getElementById('showHistory');
const botaoVoltar = document.getElementById('backToMenu');
const botaoVoltarInput = document.getElementById('backToMenuInput');
const botaoIniciarJogo = document.getElementById('startGame');

botaoJogar.addEventListener('click', () => {
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('nameInput').style.display = 'block';
});

botaoHistorico.addEventListener('click', () => {
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('history').style.display = 'block';
});

botaoVoltar.addEventListener('click', () => {
    document.getElementById('history').style.display = 'none';
    document.getElementById('mainMenu').style.display = 'block';
});

botaoVoltarInput.addEventListener('click', () => {
    document.getElementById('nameInput').style.display = 'none';
    document.getElementById('mainMenu').style.display = 'block';
});