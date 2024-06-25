class Jogador {
    constructor(nome) {
        this.nome = nome;
        this.vitorias = 0;
    }

    pegarNome() {
        return this.nome;
    }

    ganharJogo() {
        this.vitorias++;
    }
}

class JogoDaVelha {
    constructor(jogador1, jogador2) {
        this.jogadores = [jogador1, jogador2];
        this.indexJogadorAtual = 0;
        this.tabuleiro = ["", "", "", "", "", "", "", "", ""];
        this.emAndamento = false;
        this.contagemJogadas = 0;
        this.combinacoesVencedoras = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        this.jogadorAtual = this.jogadores[this.indexJogadorAtual];
    }

    iniciarJogo() {
        this.emAndamento = true;
        this.contagemJogadas = 0;
        this.tabuleiro = ["", "", "", "", "", "", "", "", ""];
        this.indexJogadorAtual = 0;
        this.jogadorAtual = this.jogadores[this.indexJogadorAtual];
        this.atualizarDisplayJogadorAtual();
        this.atualizarTabuleiro();
    }

    realizarJogada(index) {
        if (!this.emAndamento || this.tabuleiro[index] !== "") {
            return false;
        }
    
        this.tabuleiro[index] = this.jogadorAtual.pegarNome();
        this.contagemJogadas++;
        this.atualizarTabuleiro();
    
        if (this.verificarVitoria()) {
            this.emAndamento = false;
            this.jogadorAtual.ganharJogo();
            
            this.salvarResultado(this.jogadorAtual.pegarNome());
            
            document.getElementById('modalMessage').textContent = `${this.jogadorAtual.pegarNome()} venceu!`;
            document.getElementById('resultModal').style.display = 'block';
        } else if (this.contagemJogadas === 9) {
            this.emAndamento = false;
            
            this.salvarResultado('Empate');
            
            document.getElementById('modalMessage').textContent = 'Empate!';
            document.getElementById('resultModal').style.display = 'block';
        } else {
            this.trocarJogador();
        }
    
        return true;
    }

    trocarJogador() {
        this.indexJogadorAtual = 1 - this.indexJogadorAtual;
        this.jogadorAtual = this.jogadores[this.indexJogadorAtual];
        this.atualizarDisplayJogadorAtual();
    }

    verificarVitoria() {
        return this.combinacoesVencedoras.some(comb => {
            const [a, b, c] = comb;
            return this.tabuleiro[a] !== "" && this.tabuleiro[a] === this.tabuleiro[b] && this.tabuleiro[a] === this.tabuleiro[c];
        });
    }

    atualizarTabuleiro() {
        const celulas = document.querySelectorAll('.cell');
        celulas.forEach((celula, index) => {
            celula.textContent = this.tabuleiro[index];
        });
    }

    atualizarDisplayJogadorAtual() {
        const displayJogadorAtual = document.getElementById('currentPlayer');
        displayJogadorAtual.textContent = `Vez de: ${this.jogadorAtual.pegarNome()}`;
    }

    salvarResultado(resultado) {
        const resultadoFormatado = {
            jogador1: this.jogadores[0].pegarNome(),
            jogador2: this.jogadores[1].pegarNome(),
            resultado: resultado,
        };
    
        const resultadosSalvos = JSON.parse(localStorage.getItem('resultados')) || [];
        resultadosSalvos.push(resultadoFormatado);
        localStorage.setItem('resultados', JSON.stringify(resultadosSalvos));
    
        const listaResultados = document.getElementById('resultsList');
        const li = document.createElement('li');
        if (resultado === 'Empate') {
            li.textContent = `${resultadoFormatado.jogador1} x ${resultadoFormatado.jogador2} = Empate`;
        } else {
            li.textContent = `${resultadoFormatado.jogador1} x ${resultadoFormatado.jogador2} = ${resultado} Venceu`;
        }
        listaResultados.appendChild(li);
    }
}


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

document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('resultModal').style.display = 'none';
});

document.getElementById('backToMenuModal').addEventListener('click', () => {
    document.getElementById('resultModal').style.display = 'none';
    limparJogo();
    document.getElementById('mainMenu').style.display = 'block'; 
    document.getElementById('gameBoard').style.display = 'none'; 
});

function limparJogo() {
    jogoDaVelha.tabuleiro = ["", "", "", "", "", "", "", "", ""];
    jogoDaVelha.contagemJogadas = 0;
    jogoDaVelha.emAndamento = false;
    jogoDaVelha.atualizarTabuleiro();

    jogoDaVelha.indexJogadorAtual = 0;
    jogoDaVelha.jogadorAtual = jogoDaVelha.jogadores[jogoDaVelha.indexJogadorAtual];
    jogoDaVelha.atualizarDisplayJogadorAtual();

    document.getElementById('gameBoard').style.display = 'none';

    document.querySelectorAll('.cell').forEach(celula => {
        celula.style.pointerEvents = 'auto';
    });
}

function salvarNoLocalStorage(jogador1, jogador2, resultado) {
    
    const resultadosSalvos = JSON.parse(localStorage.getItem('resultados')) || [];

    
    resultadosSalvos.push({
        jogador1: jogador1,
        jogador2: jogador2,
        resultado: resultado,
    });

    
    localStorage.setItem('resultados', JSON.stringify(resultadosSalvos));
}


function carregarResultadosSalvos() {
    const resultadosSalvos = JSON.parse(localStorage.getItem('resultados')) || [];
    const listaResultados = document.getElementById('resultsList');

    
    listaResultados.innerHTML = '';

    resultadosSalvos.forEach(resultado => {
        const li = document.createElement('li');
        if (resultado.resultado === 'Empate') {
            li.textContent = `${resultado.jogador1} x ${resultado.jogador2} = Empate`;
        } else {
            li.textContent = `${resultado.jogador1} x ${resultado.jogador2} = ${resultado.resultado}` ;
        }
        listaResultados.appendChild(li);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    carregarResultadosSalvos();
});