// frontend/src/components/TapeDisplay.jsx

function TapeDisplay({ resultado }) {
  if (!resultado) return null;

  const { resultado: status, estadoFinal, passos, historico, erro } = resultado;

  if (erro) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded-md mt-4">
        Erro: {erro}
      </div>
    );
  }

  const aceita = status === 'ACEITA';
  const ultimoPasso = historico[historico.length - 1];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6 space-y-4">
      <h2 className="text-xl font-bold text-gray-800">Resultado</h2>

      <div
        className={`text-center text-2xl font-bold py-3 rounded-md ${
          aceita ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}
      >
        {aceita ? '✅ ACEITA' : '❌ REJEITADA'}
      </div>

      <p className="text-gray-600">
        Estado final: <span className="font-mono font-semibold">{estadoFinal}</span> | Passos
        executados: <span className="font-semibold">{passos}</span>
      </p>

      {/* Fita final */}
      {ultimoPasso && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">Fita final:</h3>
          <div className="flex gap-1 overflow-x-auto">
            {ultimoPasso.fita.map((simbolo, i) => (
              <div
                key={i}
                className="min-w-10 h-10 flex items-center justify-center border border-gray-300 rounded font-mono bg-gray-50"
              >
                {simbolo}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Histórico passo a passo */}
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Histórico de execução:</h3>
        <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-md">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 sticky top-0">
              <tr>
                <th className="p-2">Passo</th>
                <th className="p-2">Estado</th>
                <th className="p-2">Posição</th>
                <th className="p-2">Ação</th>
              </tr>
            </thead>
            <tbody>
              {historico.map((h, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="p-2">{h.passo}</td>
                  <td className="p-2 font-mono">{h.estado}</td>
                  <td className="p-2">{h.posicao}</td>
                  <td className="p-2">
                    {h.acao ||
                      `Lê "${h.simboloLido}" → escreve "${h.simboloEscrito}", vai para ${h.proximoEstado}, move ${h.direcao}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TapeDisplay;
