(() => {
    let altura = window.innerHeight;
    let largura = window.innerWidth;
    let vidas = 1;
    let tempoRestante;
    let nivelJogo;
    let criaMosquitoIntervalo;
    let pontuacao = 0;

    const params = new URLSearchParams(window.location.search);
    const tempoParam = parseInt(params.get('tempo'));
    nivelJogo = params.get('nivel');

    tempoRestante = tempoParam !== null ? tempoParam : 31;

    let criaMosquitoTempo = 1500;

    switch (nivelJogo) {
        case 'facil':
            criaMosquitoTempo = 2200;
            break;
        case 'medio':
            criaMosquitoTempo = 1700;
            break;
        case 'dificil':
            criaMosquitoTempo = 1150;
            break;
    }

    function atualizarTamanho() {
        altura = window.innerHeight;
        largura = window.innerWidth;
        console.log(`Largura: ${largura}, Altura: ${altura}`);
    }

    const cronometroIntervalo = setInterval(() => {
        tempoRestante -= 1;
        document.getElementById('cronometro').textContent = tempoRestante;

        if (tempoRestante < 0) {
            clearInterval(cronometroIntervalo);
            clearInterval(criaMosquitoIntervalo);
            localStorage.setItem('pontuacaoFinal', pontuacao); // Armazena a pontuação
            window.location.href = "vitoria.html";
        }
    }, 1000);

    atualizarTamanho();
    window.addEventListener('resize', atualizarTamanho);

    function criarMosquito() {
        const mosquitoExistente = document.getElementById('mosquito');
        if (mosquitoExistente) {
            mosquitoExistente.remove();
            document.getElementById(`v${vidas}`).src = "imagens/coracao_vazio.png";
            vidas++;

            if (vidas > 3) {
                clearInterval(cronometroIntervalo);
                clearInterval(criaMosquitoIntervalo);
                window.location.href = "game_over.html";
                return;
            }
        }

        const lado = Math.random() < 0.5 ? 'esquerda' : 'direita';
        const larguraMosquito = tamanhoMosquito();
        const alturaMosquito = larguraMosquito; // Assumindo que a imagem é quadrada ou aproximadamente

        // Calcula posições aleatórias dentro da tela, evitando que o mosquito saia completamente
        const posicaoX = Math.floor(Math.random() * (largura - larguraMosquito));
        const posicaoY = Math.floor(Math.random() * (altura - alturaMosquito));

        const mosquito = document.createElement('img');
        mosquito.src = 'imagens/mosquito.gif';
        mosquito.style.position = 'absolute';
        mosquito.style.left = `${posicaoX}px`;
        mosquito.style.top = `${posicaoY}px`;
        mosquito.className = `mosquito ${tamanhoAleatorio()} velocidade-${nivelJogo}`;
        mosquito.id = 'mosquito';
        mosquito.style.transform = lado === 'direita' ? 'scaleX(-1)' : 'scaleX(1)';

        mosquito.onclick = function() {
            const classeMosquito = this.className.split(' ')[1];
            let pontos = 0;

            this.style.opacity = '0.7';
            setTimeout(() => {
                this.remove();
            }, 100);

            switch (classeMosquito) {
                case 'mosquito1':
                    pontos = 10;
                    break;
                case 'mosquito2':
                    pontos = 20;
                    break;
                case 'mosquito3':
                    pontos = 30;
                    break;
            }

            pontuacao += pontos;
            atualizarPontuacao();
        };

        document.body.appendChild(mosquito);
    }

    function tamanhoMosquito() {
        const tamanho = tamanhoAleatorio();
        switch (tamanho) {
            case 'mosquito1': return 70;
            case 'mosquito2': return 90;
            case 'mosquito3': return 110;
            default: return 70;
        }
    }

    function tamanhoAleatorio() {
        const classe = Math.floor(Math.random() * 3);
        switch (classe) {
            case 0: return 'mosquito1';
            case 1: return 'mosquito2';
            case 2: return 'mosquito3';
            default: return 'mosquito1';
        }
    }

    function atualizarPontuacao() {
        const pontuacaoElement = document.getElementById('pontuacao');
        if (pontuacaoElement) {
            pontuacaoElement.textContent = pontuacao;
        } else {
            console.error("Elemento com ID 'pontuacao' não encontrado no HTML.");
        }
    }

    criaMosquitoIntervalo = setInterval(criarMosquito, criaMosquitoTempo);

    document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('cronometro').textContent = tempoRestante;
        atualizarPontuacao();
    });

})();