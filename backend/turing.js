// backend/turing.js

const SIMBOLO_VAZIO = 'ε';
const MARCADOR_INICIO = '*';
const LIMITE_PASSOS = 10000; // evita loop infinito

/**
 * Simula a execução de uma Máquina de Turing.
 *
 * @param {Object} config
 * @param {string[]} config.sigma - Alfabeto de entrada
 * @param {string[]} config.estados - Conjunto de estados (Q)
 * @param {string} config.estadoInicial - Estado inicial (q0)
 * @param {string[]} config.estadosFinais - Conjunto de estados finais (F)
 * @param {Array}  config.delta - Lista de transições
 *        { estadoAtual, simboloLido, estadoDestino, simboloEscrito, direcao }
 * @param {string[]} config.fita - Palavra de entrada, já incluindo '*' no início
 *
 * @returns {Object} resultado da simulação
 */
function simularTuring(config) {
  const { estadoInicial, estadosFinais, delta, fita } = config;

  // Cópia da fita para não alterar o array original
  let fitaAtual = [...fita];
  // Começa na posição 1 para pular o marcador de início '*' (posição 0)
  let posicao = 1;
  let estadoAtual = estadoInicial;
  let passos = 0;

  const historico = []; // guarda cada passo para exibir no front

  while (passos < LIMITE_PASSOS) {
    // Garante que a fita tenha espaço suficiente (preenche com símbolo vazio)
    if (posicao >= fitaAtual.length) {
      fitaAtual.push(SIMBOLO_VAZIO);
    }
    if (posicao < 1) {
      // O cabeçote não pode passar do marcador de início '*' (posição 0)
      posicao = 1;
    }

    const simboloLido = fitaAtual[posicao];

    // ACEITA somente se estiver em estado final E tiver lido o símbolo vazio
    // (ou seja, a fita inteira já foi percorrida/processada)
    if (estadosFinais.includes(estadoAtual) && simboloLido === SIMBOLO_VAZIO) {
      historico.push({
        passo: passos,
        estado: estadoAtual,
        posicao,
        fita: [...fitaAtual],
        acao: 'Estado final atingido ao fim da fita. Palavra ACEITA.'
      });
      return {
        resultado: 'ACEITA',
        estadoFinal: estadoAtual,
        passos,
        historico
      };
    }

    // Procura a transição correspondente
    const transicao = delta.find(
      (t) => t.estadoAtual === estadoAtual && t.simboloLido === simboloLido
    );

    if (!transicao) {
      // Não há transição definida -> REJEITA
      historico.push({
        passo: passos,
        estado: estadoAtual,
        posicao,
        fita: [...fitaAtual],
        acao: `Nenhuma transição para (${estadoAtual}, ${simboloLido}). Palavra REJEITADA.`
      });
      return {
        resultado: 'REJEITA',
        estadoFinal: estadoAtual,
        passos,
        historico
      };
    }

    // Aplica a transição: escreve o símbolo, muda de estado, move o cabeçote
    fitaAtual[posicao] = transicao.simboloEscrito;
    historico.push({
      passo: passos,
      estado: estadoAtual,
      posicao,
      simboloLido,
      simboloEscrito: transicao.simboloEscrito,
      proximoEstado: transicao.estadoDestino,
      direcao: transicao.direcao,
      fita: [...fitaAtual]
    });

    estadoAtual = transicao.estadoDestino;
    posicao += transicao.direcao === 'D' ? 1 : -1;
    passos++;
  }

  // Excedeu o limite de passos -> considera rejeição (loop infinito)
  return {
    resultado: 'REJEITA',
    motivo: 'Limite de passos excedido (possível loop infinito).',
    estadoFinal: estadoAtual,
    passos,
    historico
  };
}

module.exports = {
  simularTuring,
  SIMBOLO_VAZIO,
  MARCADOR_INICIO
};
