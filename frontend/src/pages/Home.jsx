// frontend/src/pages/Home.jsx

import { useState } from 'react';
import TuringForm from '../components/TuringForm';
import TapeDisplay from '../components/TapeDisplay';

const API_URL = 'http://localhost:3000/api/simular';

function Home() {
  const [resultado, setResultado] = useState(null);
  const [carregando, setCarregando] = useState(false);

  async function handleSimular(config) {
    setCarregando(true);
    setResultado(null);

    try {
      const resposta = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      });

      const dados = await resposta.json();
      setResultado(dados);
    } catch (erro) {
      setResultado({ erro: 'Não foi possível conectar ao servidor. Verifique se o backend está rodando.' });
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Simulador de Máquina de Turing
        </h1>

        <TuringForm onSimular={handleSimular} carregando={carregando} />
        <TapeDisplay resultado={resultado} />
      </div>
    </div>
  );
}

export default Home;