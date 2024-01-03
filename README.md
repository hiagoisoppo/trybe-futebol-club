<img src="/public/Preview.png" alt="Application Preview" />

# Trybe Futebol Clube

![Static Badge](https://img.shields.io/badge/TypeScript-4.4.4-blue)
![Static Badge](https://img.shields.io/badge/ReactJs-17.0.2-blue)
![Static Badge](https://img.shields.io/badge/ReactRouterDom-6.0.2-red)
![Static Badge](https://img.shields.io/badge/ReactTestingLibrary-11.2.-darkred)
![Static Badge](https://img.shields.io/badge/Axios-0.26.-purple)  
![Static Badge](https://img.shields.io/badge/Jest-26.6.0-red)
![Static Badge](https://img.shields.io/badge/Puppeteer-13.2.0-green)
![Static Badge](https://img.shields.io/badge/ExpressJS-4.17.1-blue)
![Static Badge](https://img.shields.io/badge/Nodemon-2.0.15-green)
![Static Badge](https://img.shields.io/badge/BcryptJS-2.4.3-white)
![Static Badge](https://img.shields.io/badge/Joi-17.11.0-yellow)
![Static Badge](https://img.shields.io/badge/Sinon-13.0.1-green)
![Static Badge](https://img.shields.io/badge/Chai-4.3.6-white)
![Static Badge](https://img.shields.io/badge/Mocha-9.2.0-darkred)
![Static Badge](https://img.shields.io/badge/MySQL2-2.3.3-white)
![Static Badge](https://img.shields.io/badge/Sequelize-6.25.5-blue)
![Static Badge](https://img.shields.io/badge/JsonWebToken-8.5.1-white)
![Static Badge](https://img.shields.io/badge/TsNode-10.7.0-green)

<details>
  <summary><strong>Português</strong></summary>

### Descrição:
Trybe Futebol Clube é uma aplicação web full stack desenvolvida em monorepo com o objetivo de registrar e organizar a pontuação em um campeonato de futebol fictício. Durante o desenvolvimento foi utilizado as seguintes tecnologias:  TypeScript, ReactJs, ExpressJs, Nodemon, Sequelize, MySQL, ReactTestingLibrary, ReactRouterDom, Axios, Jest, Puppeteer, Mocha, Chai, Sinon, JsonWebToken, BcryptJs, Joi, TsNode, Docker.
  
### Funcionalidades:
- Aba de Classificação com listagem dos times associados ao torneio e seus respectivos status.
- Aba de Partidas com busca e filtragem dos dados atualizados de partidas finalizadas e em andamento.
- Acesso ao dashboard administrativo através do login, onde podem ser atualizados os dados de partidas em andamento.

### Como acessar a aplicação
  **:warning: Antes de começar, seu docker-compose precisa estar na versão `1.29` ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está `1.26.0` por`1.29.2`.**

  - Abra o terminal e faça um clone do repositório.
  ```bash
    git clone git@github.com:hiagoisoppo/trybe-futebol-club.git
  ```
  - Acesse a pasta clonada do repositório, e instale as dependências.
  ```bash
    cd trybe-futebol-club
    npm install
    npm run install:apps
  ```
  - Execute os serviços `frontend`, `backend` e`db`.
  ```bash
    npm run compose:up
  ```
  - Abra o navegador no endereço [http://localhost:3000](http://localhost:3000).
</details>

<details>
  <summary><strong>English</strong></summary>

### Description:
Trybe Futebol Clube is a full stack web application developed in a monorepo with the aim of recording and organizing scores in a fictional football championship. During development, the following technologies were used: TypeScript, ReactJs, ExpressJs, Nodemon, Sequelize, MySQL, ReactTestingLibrary, ReactRouterDom, Axios, Jest, Puppeteer, Mocha, Chai, Sinon, JsonWebToken, BcryptJs, Joi, TsNode, Docker.
  
### Functionalities:
- Classification tab with a list of teams associated with the tournament and their respective status.
- Matches tab with search and filtering of updated data on completed and ongoing matches.
- Access to the administrative dashboard through login, where data on matches in progress can be updated.

### How to access the application:
  **:warning: Before you begin, your docker-compose needs to be at version `1.29` or higher. [Look here](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) or [in the documentation](https://docs.docker.com/compose/install/) how to install it. In the first article, you can replace where it is with `1.26.0` with `1.29.2`.**

  - Open the terminal and clone the repository.
  ```bash
    git clone git@github.com:hiagoisoppo/trybe-futebol-club.git
  ```
 - Access the cloned repository and install the dependencies.
  ```bash
    cd trybe-futebol-club
    npm install
    npm run install:apps
  ```
  - Run the `frontend`, `backend` and `db` services.
  ```bash
    npm run compose:up
  ```
  - Open browser at [http://localhost:3000](http://localhost:3000).
</details>

<details>
  <summary><strong>API REST - Endpoints</strong></summary>
  
  ### `GET` /
  - Health check response:
  ```json
  {
    "ok": true
  }
  ```

  ### `GET` /teams
  - Response:
  ```json
  [
	{
		"id": 1,
		"teamName": "Avaí/Kindermann"
	},
	{
		"id": 2,
		"teamName": "Bahia"
	},
    ...
  ]
  ```

  ### `GET` /teams/:id
  - Response:
  ```json
  {
    "id": 2,
    "teamName": "Bahia"
  }
  ```

  ### `POST` /login
  - Send Body:
  ```json
  {
    "email": "admin@admin.com",
    "password": "secret_admin"
  }
  ```
  - Response:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTcwNDMwNzY1MH0.c6nkn1AaCQsV8dESvGWWQuyXkMstHcjGW6toa51FODk"
  }
  ```

  ### `GET` /login/role
  - Send Header:
  ```json
  {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTcwNDMwNzY1MH0.c6nkn1AaCQsV8dESvGWWQuyXkMstHcjGW6toa51FODk"
  }
  ```
  - Response:
  ```json
  {
    "role": "admin"
  }
  ```

  ### `GET` /matches
  ##### `Filter options` /matches?inProgress=`boolean`
  - Response:
  ```json
  [
    {
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 1,
      "awayTeamId": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "São Paulo"
      },
      "awayTeam": {
        "teamName": "Grêmio"
      }
    },
    {
      "id": 2,
      "homeTeamId": 9,
      "homeTeamGoals": 1,
      "awayTeamId": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Internacional"
      },
      "awayTeam": {
        "teamName": "Santos"
      }
    },
    ...
  ]
  ```

  ### `PATCH` /matches/:id/finish
  - Send Header:
  ```json
  {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTcwNDMwNzY1MH0.c6nkn1AaCQsV8dESvGWWQuyXkMstHcjGW6toa51FODk"
  }
  ```
  - Response:
  ```json
  {
	"message": "Finished"
  }
  ```

  ### `PATCH` /matches/:id
  - Send Header:
  ```json
  {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTcwNDMwNzY1MH0.c6nkn1AaCQsV8dESvGWWQuyXkMstHcjGW6toa51FODk"
  }
  ```
  - Send Body:
  ```json
  {
    "homeTeamGoals": 3,
    "awayTeamGoals": 1
  }
  ```
  - Response:
  ```json
  {
    "id": 41,
    "homeTeamId": 16,
    "homeTeamGoals": 3,
    "awayTeamId": 9,
    "awayTeamGoals": 1,
    "inProgress": true
  }
  ```

  ### `POST` /matches
  - Send Header:
  ```json
  {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsImlhdCI6MTcwNDMwNzY1MH0.c6nkn1AaCQsV8dESvGWWQuyXkMstHcjGW6toa51FODk"
  }
  ```
  - Send Body:
  ```json
  {
    "homeTeamId": 16, // O valor deve ser o id do time
    "awayTeamId": 8, // O valor deve ser o id do time
    "homeTeamGoals": 2,
    "awayTeamGoals": 2
  }
  ```
  - Response:
  ```json
  {
    "id": 49,
    "homeTeamId": 16,
    "homeTeamGoals": 2,
    "awayTeamId": 8,
    "awayTeamGoals": 2,
    "inProgress": true
  }
  ```

  ### `GET` /leaderboard
  - Response:
  ```json
  [
    {
      "name": "Palmeiras",
      "totalPoints": "13",
      "totalGames": 5,
      "totalVictories": "4",
      "totalDraws": "1",
      "totalLosses": "0",
      "goalsFavor": "17",
      "goalsOwn": "5",
      "goalsBalance": "12",
      "efficiency": "86.67"
    },
    {
      "name": "Corinthians",
      "totalPoints": "12",
      "totalGames": 5,
      "totalVictories": "4",
      "totalDraws": "0",
      "totalLosses": "1",
      "goalsFavor": "12",
      "goalsOwn": "3",
      "goalsBalance": "9",
      "efficiency": "80.00"
    },
    {
      "name": "Santos",
      "totalPoints": "11",
      "totalGames": 5,
      "totalVictories": "3",
      "totalDraws": "2",
      "totalLosses": "0",
      "goalsFavor": "12",
      "goalsOwn": "6",
      "goalsBalance": "6",
      "efficiency": "73.33"
    },
    ...
  ]
  ```

  ### `GET` /leaderboard/home
  - Response:
  ```json
  [
    {
      "name": "Santos",
      "totalPoints": "9",
      "totalGames": 3,
      "totalVictories": "3",
      "totalDraws": "0",
      "totalLosses": "0",
      "goalsFavor": "9",
      "goalsOwn": "3",
      "goalsBalance": "6",
      "efficiency": "100.00"
    },
    {
      "name": "Palmeiras",
      "totalPoints": "7",
      "totalGames": 3,
      "totalVictories": "2",
      "totalDraws": "1",
      "totalLosses": "0",
      "goalsFavor": "10",
      "goalsOwn": "5",
      "goalsBalance": "5",
      "efficiency": "77.78"
    },
    {
      "name": "São Paulo",
      "totalPoints": "6",
      "totalGames": 2,
      "totalVictories": "2",
      "totalDraws": "0",
      "totalLosses": "0",
      "goalsFavor": "6",
      "goalsOwn": "1",
      "goalsBalance": "5",
      "efficiency": "100.00"
    },
    ...
  ]
  ```

  ### `GET` /leaderboard/away
  - Response:
  ```json
  [
    {
      "name": "Palmeiras",
      "totalPoints": "6",
      "totalGames": 2,
      "totalVictories": "2",
      "totalDraws": "0",
      "totalLosses": "0",
      "goalsFavor": "7",
      "goalsOwn": "0",
      "goalsBalance": "7",
      "efficiency": "100.00"
    },
    {
      "name": "Corinthians",
      "totalPoints": "6",
      "totalGames": 3,
      "totalVictories": "2",
      "totalDraws": "0",
      "totalLosses": "1",
      "goalsFavor": "6",
      "goalsOwn": "2",
      "goalsBalance": "4",
      "efficiency": "66.67"
    },
    {
      "name": "Internacional",
      "totalPoints": "6",
      "totalGames": 2,
      "totalVictories": "2",
      "totalDraws": "0",
      "totalLosses": "0",
      "goalsFavor": "3",
      "goalsOwn": "0",
      "goalsBalance": "3",
      "efficiency": "100.00"
    },
    ...
  ]
  ```

</details>