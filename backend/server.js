// backend/server.js

const express = require('express');
const cors = require('cors');
const { simularTuring } = require('./turing');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());           // permite requisições do frontend (Vite roda em outra porta)
app.use(express.json());   // permite receber JSON no corpo das requisições

// Rota de teste
app.get('/', (req, res) => {
  res.json({ mensagem: 'API do Simulador de Máquina de Turing está no ar!' });
});

// Rota principal: recebe a configuração da MT e retorna o resultado
app.post('/api/simular', (req, res) => {
  try {
    const { sigma, estados, estadoInicial, estadosFinais, delta, fita } = req.body;

    // Validação básica dos campos obrigatórios
    if (!estadoInicial || !estadosFinais || !delta || !fita) {
      return res.status(400).json({
        erro: 'Campos obrigatórios faltando: estadoInicial, estadosFinais, delta, fita.'
      });
    }

    const resultado = simularTuring({
      sigma,
      estados,
      estadoInicial,
      estadosFinais,
      delta,
      fita
    });

    res.json(resultado);
  } catch (erro) {
    console.error('Erro ao simular:', erro);
    res.status(500).json({ erro: 'Erro interno ao simular a máquina de Turing.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});