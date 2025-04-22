let altura = window.innerHeight; // Inicializa a altura da janela
let largura = window.innerWidth;   // Inicializa a largura da janela
let vidas = 1;
let tempo = 31;
let nivel = window.location.search; // Obtém a string de consulta da URL
nivel = nivel.replace('?', ''); // Remove o '?' do início da string

let criaMosquitoTempo = 1500; // Tempo padrão para criar mosquitos

// Define o tempo de criação de mosquitos com base no nível selecionado
if (nivel === 'facil') {
    criaMosquitoTempo = 2500; // Fácil
} else if (nivel === "medio") {
    criaMosquitoTempo = 2000; // Médio
} else if (nivel === "dificil") { // Corrigido para "dificil"
    criaMosquitoTempo = 750; // Difícil
} 

function atualizarTamanho() {
    altura = window.innerHeight; // Atualiza a altura da janela
    largura = window.innerWidth;  // Atualiza a largura da janela
    console.log(largura, altura); // Exibe os valores atualizados no console
}

var cronometro = setInterval(function(){

    tempo -=1

    if(tempo < 0) {
        clearInterval(cronometro);
        clearInterval(criaMosquito);
        window.location.href = "vitoria.html";
    } else {
        document.getElementById('cronometro').innerHTML = tempo;
    }
    
}, 1000);

// Chama a função inicialmente para definir os valores
atualizarTamanho();

// Adiciona um listener para o evento de redimensionamento
window.addEventListener('resize', atualizarTamanho);

// Função para gerar e exibir a posição aleatória do mosquito
function posicaoRamdom() {

    const mosquitoExistente = document.getElementById('mosquito');
    if (mosquitoExistente) {
        mosquitoExistente.remove();

        if(vidas > 3){
            window.location.href = "game_over.html";
            
        } else {
            document.getElementById('v' + vidas).src="imagens/coracao_vazio.png";
        }

        vidas++;
    }

    // Gera a posição aleatória
    let posicaoX = Math.floor(Math.random() * largura) -90;
    let posicaoY = Math.floor(Math.random() * altura) -90;
    console.log(`Posição Aleatória: X = ${posicaoX}, Y = ${posicaoY}`);

    // Ajusta a posição para não sair da tela
    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    // Cria o elemento da imagem do mosquito
    const mosquito = document.createElement('img');

    mosquito.src = 'imagens/mosca.png';
    mosquito.style.position = 'absolute'; // Define a posição como absoluta
    mosquito.style.left = posicaoX + 'px'; // Define a posição X
    mosquito.style.top = posicaoY + 'px';  // Define a posição Y
    mosquito.className = tamanhoAleatorio() + " " + ladoAleatorio();
    mosquito.id = 'mosquito';
    mosquito.onclick = function() {
        this.remove();
    }

    // Adiciona o mosquito ao corpo do documento
    document.body.appendChild(mosquito);
}

// Chama a função para gerar a posição aleatória do mosquito
posicaoRamdom();

// tamanho aleatorio

function tamanhoAleatorio () {

    var classe = Math.floor(Math.random() * 3);

    switch(classe){
        case 0:
            return 'mosquito1';
        
        case 1:
            return 'mosquito2';

        case 2:
            return 'mosquito3';
    }

    
}

tamanhoAleatorio();

// lado aleatorio

function ladoAleatorio () {
    var classe = Math.floor(Math.random() * 2);

    switch(classe){
        case 0:
            return 'ladoA';
        
        case 1:
            return 'ladoB';

    }
}

ladoAleatorio();

// Chama a função para gerar um novo mosquito

var criaMosquito = setInterval(function(){
    posicaoRamdom();
}, criaMosquitoTempo);

function iniciarJogo() {
    var nivel = document.getElementById('nivel').value; // Obtém o valor do nível selecionado

    if (nivel === "") {
        window.alert("Selecione um nível"); // Exibe um alerta se nenhum nível for selecionado
        return; // Sai da função se o nível não for selecionado
    }

    // Redireciona para a página do jogo, passando o nível selecionado na URL
    window.location.href = "jogo.html?nivel=" + nivel;
}