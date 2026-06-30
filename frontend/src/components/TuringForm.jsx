// frontend/src/components/TuringForm.jsx

import { useState } from 'react';

const SIMBOLO_VAZIO = 'ε';
const MARCADOR_INICIO = '*';

function TuringForm({ onSimular, carregando }) {
  const [sigma, setSigma] = useState('a,b');
  const [estados, setEstados] = useState('q0,q1,q2');
  const [estadoInicial, setEstadoInicial] = useState('q0');
  const [estadosFinais, setEstadosFinais] = useState('q2');
  const [deltaTexto, setDeltaTexto] = useState('q0,a,q1,X,D\nq1,b,q2,Y,D');
  const [palavra, setPalavra] = useState('ab');

  // Converte "a,b,c" em ["a", "b", "c"]
  function paraLista(texto) {
    return texto
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  // Converte o texto de transições em array de objetos delta
  function paraDelta(texto) {
    return texto
      .split('\n')
      .map((linha) => linha.trim())
      .filter((linha) => linha.length > 0)
      .map((linha) => {
        const [estadoAtual, simboloLido, estadoDestino, simboloEscrito, direcao] =
          linha.split(',').map((v) => v.trim());
        return { estadoAtual, simboloLido, estadoDestino, simboloEscrito, direcao };
      });
  }

  // Converte a palavra em fita: adiciona '*' no início
  function paraFita(palavra) {
    const simbolos = palavra.split('').map((c) => (c === '_' ? SIMBOLO_VAZIO : c));
    return [MARCADOR_INICIO, ...simbolos];
  }

  function handleSubmit(e) {
    e.preventDefault();

    const config = {
      sigma: paraLista(sigma),
      estados: paraLista(estados),
      estadoInicial: estadoInicial.trim(),
      estadosFinais: paraLista(estadosFinais),
      delta: paraDelta(deltaTexto),
      fita: paraFita(palavra)
    };

    onSimular(config);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-gray-800">Configuração da Máquina de Turing</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Sigma (alfabeto, separado por vírgula)
        </label>
        <input
          type="text"
          value={sigma}
          onChange={(e) => setSigma(e.target.value)}
          className="mt-1 w-full border border-gray-300 rounded-md p-2"
          placeholder="a,b,c"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Estados (Q, separado por vírgula)
        </label>
        <input
          type="text"
          value={estados}
          onChange={(e) => setEstados(e.target.value)}
          className="mt-1 w-full border border-gray-300 rounded-md p-2"
          placeholder="q0,q1,q2"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Estado inicial (q0)</label>
          <input
            type="text"
            value={estadoInicial}
            onChange={(e) => setEstadoInicial(e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
            placeholder="q0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Estados finais (F, separados por vírgula)
          </label>
          <input
            type="text"
            value={estadosFinais}
            onChange={(e) => setEstadosFinais(e.target.value)}
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
            placeholder="q2"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Função de transição (delta) — uma por linha:
          <span className="block text-xs text-gray-500">
            formato: estadoAtual,simboloLido,estadoDestino,simboloEscrito,direcao(D/E)
          </span>
        </label>
        <textarea
          value={deltaTexto}
          onChange={(e) => setDeltaTexto(e.target.value)}
          rows={6}
          className="mt-1 w-full border border-gray-300 rounded-md p-2 font-mono text-sm"
          placeholder="q0,a,q1,X,D"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Palavra a ser testada
          <span className="block text-xs text-gray-500">
            use "_" para representar o símbolo vazio (ε), se precisar
          </span>
        </label>
        <input
          type="text"
          value={palavra}
          onChange={(e) => setPalavra(e.target.value)}
          className="mt-1 w-full border border-gray-300 rounded-md p-2 font-mono"
          placeholder="ab"
        />
      </div>

      <button
        type="submit"
        disabled={carregando}
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
      >
        {carregando ? 'Simulando...' : 'Simular'}
      </button>
    </form>
  );
}

export default TuringForm;
