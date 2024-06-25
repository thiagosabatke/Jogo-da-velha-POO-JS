const botaoJogar = document.getElementById('play');
const botaoHistorico = document.getElementById('showHistory');
const botaoVoltar = document.getElementById('backToMenu');
const botaoVoltarInput = document.getElementById('backToMenuInput');
const botaoIniciarJogo = document.getElementById('startGame');

let jogoDaVelha;

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

botaoIniciarJogo.addEventListener('click', () => {
    const nomeJogador1 = document.getElementById('player1').value || 'Jogador 1';
    const nomeJogador2 = document.getElementById('player2').value || 'Jogador 2';

    const jogador1 = new Jogador(nomeJogador1);
    const jogador2 = new Jogador(nomeJogador2);

    jogoDaVelha = new JogoDaVelha(jogador1, jogador2);

    document.getElementById('nameInput').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'block';
    jogoDaVelha.iniciarJogo();
});

document.querySelectorAll('.cell').forEach(celula => {
    celula.addEventListener('click', () => {
        const index = celula.getAttribute('data-index');
        if (jogoDaVelha.realizarJogada(index)) {
            celula.style.pointerEvents = 'none'; 
        }
    }); 
});