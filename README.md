# Simulador de Máquina de Turing

Simulador web de uma Máquina de Turing determinística, desenvolvido como projeto de aprendizado em desenvolvimento full-stack.

## 🎯 Sobre o projeto

Esta aplicação permite configurar e executar uma Máquina de Turing a partir de:

- **Σ (sigma)** — alfabeto de entrada
- **Q (estados)** — conjunto de estados
- **q0** — estado inicial
- **F** — conjunto de estados finais (de aceitação)
- **δ (delta)** — função de transição
- **Palavra de entrada** — a fita a ser processada

O simulador executa a máquina passo a passo e retorna se a palavra é **ACEITA** ou **REJEITADA**, junto com o histórico completo da execução.

## 🚀 Tecnologias utilizadas

**Backend**
- Node.js
- Express
- CORS

**Frontend**
- React
- Vite
- Tailwind CSS v4

## 📁 Estrutura do projeto

```
turing-simulator/
├── backend/
│   ├── server.js       # servidor Express e rotas da API
│   └── turing.js        # lógica de simulação da Máquina de Turing
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TuringForm.jsx    # formulário de configuração
│   │   │   └── TapeDisplay.jsx   # exibição da fita e resultado
│   │   ├── pages/
│   │   │   └── Home.jsx          # página principal
│   │   └── App.jsx
│   └── vite.config.js
├── package.json
└── README.md
```

## ⚙️ Como funciona a simulação

1. A fita é representada como um array, com o marcador `*` na posição inicial (posição 0)
2. O cabeçote de leitura/escrita começa na posição 1 (logo após o `*`)
3. A cada passo, a máquina:
   - Lê o símbolo na posição atual
   - Verifica se o estado atual é final **e** o símbolo lido é vazio (`ε`) → se sim, **ACEITA**
   - Caso contrário, busca uma transição correspondente em `δ` para `(estado atual, símbolo lido)`
   - Se não encontrar transição → **REJEITA**
   - Se encontrar, escreve o novo símbolo, muda de estado e move o cabeçote (`D` para direita, `E` para esquerda)
4. Um limite de passos evita loops infinitos

## 📝 Formato de entrada no simulador

| Campo | Formato | Exemplo |
|---|---|---|
| Sigma | valores separados por vírgula | `a,b` |
| Estados | valores separados por vírgula | `q0,q1,q2` |
| Estado inicial | texto simples | `q0` |
| Estados finais | valores separados por vírgula | `q2` |
| Delta | uma transição por linha: `estadoAtual,simboloLido,estadoDestino,simboloEscrito,direcao` | `q0,a,q1,X,D` |
| Palavra | sequência de símbolos (use `_` para representar ε, se necessário) | `aabb` |

## ▶️ Como executar o projeto localmente

### Pré-requisitos
- Node.js instalado (versão 18 ou superior recomendada)

### 1. Clonar o repositório
```bash
git clone https://github.com/PauloVictor21/Simulador-Turing.git
cd Simulador-Turing
```

### 2. Instalar dependências do backend
```bash
npm install
```

### 3. Instalar dependências do frontend
```bash
cd frontend
npm install
cd ..
```

### 4. Rodar o backend
```bash
npm run dev:back
```
O servidor estará disponível em `http://localhost:3000`

### 5. Rodar o frontend (em outro terminal)
```bash
npm run dev:front
```
A aplicação estará disponível em `http://localhost:5173` (ou na porta indicada pelo Vite)

## 🧪 Exemplo de uso

**Reconhecer a linguagem aⁿbⁿcⁿ (mesmo número de a's, b's e c's):**

- Sigma: `a,b,c`
- Estados: `q0,q1,q2,q3,q4`
- Estado inicial: `q0`
- Estados finais: `q4`
- Delta:
  ```
  q0,a,q1,X,D
  q0,X,q0,X,D
  q0,Y,q0,Y,D
  q0,Z,q0,Z,D
  q0,ε,q4,ε,D
  q1,a,q1,a,D
  q1,Y,q1,Y,D
  q1,b,q2,Y,D
  q2,b,q2,b,D
  q2,Z,q2,Z,D
  q2,c,q3,Z,E
  q3,a,q3,a,E
  q3,b,q3,b,E
  q3,Y,q3,Y,E
  q3,Z,q3,Z,E
  q3,X,q0,X,D
  ```
- Palavra: `aabbcc` → resultado esperado: **ACEITA**
- Palavra: `aabbc` ou `aabccb` → resultado esperado: **REJEITA**

**Como funciona:** a máquina marca um `a` como `X`, avança até achar um `b` não marcado e o marca como `Y`, avança até achar um `c` não marcado e o marca como `Z`, depois volta ao início para repetir o processo com o próximo trio. Símbolos diferentes (`X`, `Y`, `Z`) evitam ambiguidade entre letras já processadas de tipos diferentes. Só aceita se, ao final, todos os `a`s, `b`s e `c`s tiverem sido marcados em pares completos.

## 📌 Status do projeto

Projeto de aprendizado, desenvolvido de forma incremental como exercício de fixação dos conceitos de Máquinas de Turing e desenvolvimento full-stack com Node.js, Express e React.

## 👤 Autor

Paulo Victor — [GitHub](https://github.com/PauloVictor21)
