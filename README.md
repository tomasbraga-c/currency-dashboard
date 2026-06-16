# Currency.Dash 💱

> **TRAVEL · INVEST · TRACK** — Dashboard de cotações de moedas internacionais e criptomoedas em tempo real.

![Currency.Dash Preview](https://currency-dashboard-beryl.vercel.app/preview.png)

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
- 📧 **Relatório diário** — Configure seu e-mail para receber resumo matinal, com cancelamento a qualquer momento
- 🌙 **Modo escuro/claro** — Toggle com tema elegante
- ⏳ **Tela de inicialização** — Aviso de "servidor acordando" enquanto o backend sai da hibernação

---

## 🛠️ Stack

### Backend
- **Python 3.14**
- **FastAPI** — Framework web assíncrono
- **Uvicorn** — Servidor ASGI
- **httpx** — Cliente HTTP assíncrono
- **Pydantic** — Validação de dados
- **Supabase (PostgreSQL)** — Persistência das preferências dos usuários

### Frontend
- **React 18** + **Vite**
- **Recharts** — Gráficos interativos
- **Axios** — Requisições HTTP
- **Context API** — Gerenciamento de estado (tema)

### APIs Externas
- **AwesomeAPI** — Cotações de moedas em BRL
- **CoinGecko** — Preços e variações de criptomoedas (com API Key Demo)

### Infraestrutura
- **Vercel** — Frontend
- **Render** — Backend
- **UptimeRobot** — Monitoramento que mantém o backend acordado (ping a cada 5 min no /health)

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

---

## 🚀 Como Rodar Localmente

### Pré-requisitos
- Python 3.10+
- Node.js 18+
- Git
- Conta no Supabase (gratuita)

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
# Adicione AWESOME_API_KEY, COINGECKO_API_KEY, SUPABASE_URL e SUPABASE_KEY no .env

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

## 🗄️ Banco de Dados (Supabase)

As preferências dos usuários são persistidas em uma tabela `subscribers` no Supabase:

| Coluna | Tipo | Descrição |
|--------|------|-----------|
| `id` | uuid | Identificador único |
| `email` | text | E-mail do usuário (único) |
| `currencies` | text[] | Moedas de preferência |
| `cryptos` | text[] | Criptomoedas de preferência |
| `active` | boolean | Se a inscrição está ativa |
| `created_at` | timestamp | Data de cadastro |

O cancelamento de inscrição não apaga o registro — apenas marca `active = false`, preservando o histórico.

---

## 📡 Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/health` | Health check (GET e HEAD) para monitoramento |
| GET | `/api/v1/currencies` | Cotações padrão (USD, EUR, GBP, JPY, ARS) |
| GET | `/api/v1/currencies/{symbol}` | Cotação de par específico |
| GET | `/api/v1/currencies/available` | Todos os pares disponíveis |
| GET | `/api/v1/currencies/{symbol}/history` | Histórico de 30 dias |
| GET | `/api/v1/cryptos` | Bitcoin e Ethereum |
| GET | `/api/v1/cryptos/{id}` | Crypto específica |
| GET | `/api/v1/summary` | Resumo do dia (para relatório) |
| GET | `/api/v1/preferences` | Lista todos os usuários ativos |
| GET | `/api/v1/preferences/{email}` | Preferências de um usuário |
| POST | `/api/v1/preferences` | Salvar/atualizar preferências |
| GET | `/api/v1/unsubscribe?email=` | Cancelar inscrição do relatório |

---

## ⚙️ Resiliência

O backend foi projetado para lidar com as limitações do plano gratuito e instabilidades das APIs externas:

- **Cache em memória** com TTL para reduzir chamadas às APIs externas
- **Retry com backoff exponencial** em caso de rate limit (429)
- **Pré-aquecimento de cache** no startup do servidor
- **UptimeRobot** mantém o backend acordado, evitando hibernação do Render

---

## 🔗 Projeto relacionado — Daily Report Automation

O [Daily Report Automation](https://github.com/tomasbraga-c/daily-report-automation) consome a API do Currency.Dash e envia os relatórios diários por e-mail via GitHub Actions. Os dois projetos se complementam: o Currency.Dash coleta e expõe os dados, e o Daily Report distribui por e-mail.

---

## 🔮 Próximos Passos

- [ ] Conversor de moedas integrado
- [ ] Alertas de variação por e-mail
- [ ] Frequência personalizável do relatório (diário/semanal)
- [ ] Persistência de cache em disco para sobreviver a redeploys

---

## 👨‍💻 Autor

**Tomás Braga**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/tomasbraga)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=flat&logo=github&logoColor=white)](https://github.com/tomasbraga-c)

---

## 📄 Licença

Este projeto está sob a licença MIT.
