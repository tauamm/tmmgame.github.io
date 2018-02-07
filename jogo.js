/*
Jogo Balao
Versao 0.01
autor: Taua Mendonca
*/
var timerId = null; // variavel que armazena a chamada da funcao timeout


function iniciaJogo(){
	var url = window.location.search;
	
	var nivel_jogo = url.replace("?","");	

	var tempo_segundos = 0;


	// Nivel 1 - facil - 120 segundos
	if (nivel_jogo == 1) {
		tempo_segundos = 120;
	}

	// nivel 2 - Medio - 90 segundos
	if (nivel_jogo == 2) {
		tempo_segundos = 90;
	}
	// nivel 3 - dificil - 60 segundos
	if (nivel_jogo == 3) {
		tempo_segundos = 60;
	}


 
	// inserindo os segundos no span
	document.getElementById('cronometro').innerHTML = tempo_segundos;

	//quantidade de baloes
	var qnt_baloes = 60;
	cria_baloes(qnt_baloes);

	//Imprimir quantidade total de baloes
	document.getElementById('baloes_inteiros').innerHTML = qnt_baloes;
	document.getElementById('baloes_estourados').innerHTML = 0;

	contagem_tempo(tempo_segundos+1);
}
	//cronometro
function contagem_tempo(segundos){

	segundos = segundos-1;

	if (segundos ==-1) {
		clearTimeout(timerId);// para a execucao da funcao do settimeout
		game_over();
		return false;
	}

	document.getElementById('cronometro').innerHTML = segundos;
	timerId = setTimeout("contagem_tempo("+segundos+")", 1000);

}

function game_over(){
	remove_eventos_baloes();
    alert('Fim de jogo, você não conseguiu estourar todos os balões a tempo');

}


function cria_baloes(qnt_baloes){
	for (var i = 1; i <= qnt_baloes; i++) {

		var balao = document.createElement("img");
		balao.src ='imagens/balao_azul_pequeno.png';
		balao.style.margin = '10px';
		balao.id = 'b'+i;
		balao.onclick = function(){ estourar(this);}

		document.getElementById('cenario').appendChild(balao);
	}
}

function estourar(e){
	var id_balao = e.id;

	document.getElementById(id_balao).setAttribute("onclick","")
	document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png'
	pontuacao(-1);
	
}

function pontuacao(acao){
	var baloes_inteiros = document.getElementById('baloes_inteiros').innerHTML;
	var baloes_estourados = document.getElementById('baloes_estourados').innerHTML;

	baloes_inteiros = parseInt(baloes_inteiros);
	baloes_estourados = parseInt(baloes_estourados);

	baloes_inteiros = baloes_inteiros + acao;
	baloes_estourados = baloes_estourados - acao;

	document.getElementById('baloes_inteiros').innerHTML = baloes_inteiros;
	document.getElementById('baloes_estourados').innerHTML = baloes_estourados;

	situacao_jogo(baloes_inteiros);

}

function situacao_jogo(baloes_inteiros){
	if (baloes_inteiros == 0) {
		alert('Parabens, voce conseguiu estourar todos os baloes a tempo');
		parar_jogo();
	}
}

function parar_jogo(){
	clearTimeout(timerId);
}

function remove_eventos_baloes() {
    var i = 1; //contado para recuperar balões por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}