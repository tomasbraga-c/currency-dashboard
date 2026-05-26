# Currency.Dash 💱

> **TRAVEL · INVEST · TRACK** — Dashboard de cotações de moedas internacionais e criptomoedas em tempo real.

![Currency.Dash](https://currency-dashboard-beryl.vercel.app)

## 🔗 Links

- **Frontend (Vercel):** https://currency-dashboard-beryl.vercel.app
- **Backend API (Render):** https://currency-dashboard-api.onrender.com
- **Documentação da API:** https://currency-dashboard-api.onrender.com/docs

---

## 📋 Sobre o Projeto

O **Currency.Dash** é um dashboard web fullstack para acompanhamento de cotações de moedas internacionais e criptomoedas em tempo real. Desenvolvido como projeto de portfólio, combina funcionalidades úteis para **viajantes** e **investidores**.

### Funcionalidades

- 📊 **Cotações em tempo real** — USD, EUR, GBP, JPY, ARS e mais
- ✈️ **Câmbio turístico** — Toggle entre câmbio comercial e turístico (USD/EUR)
- ₿ **Criptomoedas** — Bitcoin, Ethereum e outras com variação 24h em BRL e USD
- 📈 **Gráfico histórico** — Evolução dos últimos 30 dias com seleção múltipla de moedas
- 🏆 **Desempenho do Dia** — Ranking de valorização/desvalorização
- 🔍 **Busca personalizada** — Adicione qualquer moeda disponível ao painel
- 📧 **Relatório diário** — Configure seu e-mail para receber resumo matinal
- 🌙 **Modo escuro/claro** — Toggle com tema elegante

---

## 🛠️ Stack

### Backend
- **Python 3.14**
- **FastAPI** — Framework web assíncrono
- **Uvicorn** — Servidor ASGI
- **httpx** — Cliente HTTP assíncrono
- **Pydantic** — Validação de dados

### Frontend
- **React 18** + **Vite**
- **Recharts** — Gráficos interativos
- **Axios** — Requisições HTTP
- **Context API** — Gerenciamento de estado (tema)

### APIs Externas
- **AwesomeAPI** — Cotações de moedas em BRL
- **CoinGecko** — Preços e variações de criptomoedas

### Deploy
- **Vercel** — Frontend
- **Render** — Backend

---

## 🏗️ Arquitetura

```
currency-dashboard/
├── backend/
│   ├── app/
│   │   ├── main.py              # Ponto de entrada FastAPI
│   │   ├── routers/             # Endpoints da API
│   │   │   ├── currencies.py    # Rotas de moedas
│   │   │   ├── bitcoin.py       # Rotas de crypto
│   │   │   ├── preferences.py   # Rotas de preferências
│   │   │   └── summary.py       # Rota de resumo diário
│   │   ├── services/            # Lógica de negócio
│   │   │   ├── exchange.py      # Integração AwesomeAPI
│   │   │   ├── crypto.py        # Integração CoinGecko
│   │   │   ├── preferences.py   # Gestão de preferências
│   │   │   └── summary.py       # Geração de resumo
│   │   └── models/
│   │       └── schemas.py       # Schemas Pydantic
│   ├── requirements.txt
│   └── Procfile
└── frontend/
    └── src/
        ├── components/          # Componentes reutilizáveis
        │   ├── CurrencyCard.jsx
        │   ├── BitcoinCard.jsx
        │   ├── HistoryChart.jsx
        │   ├── RankingList.jsx
        │   ├── SearchBar.jsx
        │   ├── EmailModal.jsx
        │   └── ThemeToggle.jsx
        ├── hooks/
        │   ├── useCurrencies.js  # Polling de cotações
        │   └── useIsMobile.js
        ├── pages/
        │   └── Dashboard.jsx
        └── services/
            └── api.js            # Chamadas à API
```

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
- Python 3.10+
- Node.js 18+
- Git

### Backend

```bash
# Clone o repositório
git clone https://github.com/tomasbraga-c/currency-dashboard.git
cd currency-dashboard/backend

# Crie e ative o ambiente virtual
python -m venv venv
source venv/Scripts/activate  # Windows Git Bash
# ou
source venv/bin/activate       # Linux/Mac

# Instale as dependências
pip install -r requirements.txt

# Configure as variáveis de ambiente
cp .env.example .env
# Adicione sua AWESOME_API_KEY no .env

# Rode o servidor
uvicorn app.main:app --reload
```

O backend estará disponível em `http://localhost:8000`

Documentação interativa: `http://localhost:8000/docs`

### Frontend

```bash
cd ../frontend

# Instale as dependências
npm install

# Configure a URL da API
# Crie o arquivo .env.local com:
# VITE_API_URL=http://localhost:8000/api/v1

# Rode o servidor de desenvolvimento
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

---

## 📡 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/api/v1/currencies` | Cotações padrão (USD, EUR, GBP, JPY, ARS) |
| GET | `/api/v1/currencies/{symbol}` | Cotação de par específico |
| GET | `/api/v1/currencies/available` | Todos os pares disponíveis |
| GET | `/api/v1/currencies/{symbol}/history` | Histórico de 30 dias |
| GET | `/api/v1/cryptos` | Bitcoin e Ethereum |
| GET | `/api/v1/cryptos/{id}` | Crypto específica |
| GET | `/api/v1/summary` | Resumo do dia (para relatório) |
| GET | `/api/v1/preferences/{email}` | Preferências do usuário |
| POST | `/api/v1/preferences` | Salvar preferências |

---

## 🔮 Próximos Passos

- [ ] **daily-report-automation** — Script Python + GitHub Actions para envio automático de relatório diário por e-mail
- [ ] Conversor de moedas integrado
- [ ] Alertas de variação por e-mail
- [ ] Suporte a mais criptomoedas

---

## 👨‍💻 Autor

**Tomás Braga**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/tomasbraga)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/tomasbraga-c)

---

## 📄 Licença

Este projeto está sob a licença MIT.

---

> Desenvolvido com 🤍 como projeto de portfólio — Engenharia de Software, 3º semestre.
