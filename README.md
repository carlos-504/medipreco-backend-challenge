# Medipreço

## Pré-requisitos para o setup:

Baixe na sua máquina as seguintes dependências:

* NodeJS
* Postgres

## Ambiente

* O BackEnd será executado na porta 3000

## Aplicação

A aplicação é executada a partir de comandos npm do NodeJS. O projeto usa 3 comandos npm

* Para executar a aplicação e iniciar o servidor, esse script também inicia a conexão com a base de dados, cria as tabelas do modelo e executa uma inserção em massa (seed)
```
npm start
```
* Para criar os arquivos JavaScript através dos arquivos TypeScript do diretório
```
npm run build

```
* Para executar a aplicação gerada no build
 ```
npm run server

```
    

## Estrutura de diretórios
		Medipreco
			|
			|-- .github / workflows (arquivos de CI)
      			|-- src (arquivos TypeScript da aplicação)
			|
        			|-- config (Arqui de configuração do banco de dados)                
        			|-- controllers (Camada controller da aplicação)        
				|-- data (dados dos banco criados a partir do csv)				
			  	|-- interfaces (interfaces dos modelos)
				|-- models (Modelos das tabelas do banco de dados)
        			|-- routes (Endpoints da aplicação)                
        			|-- seeders (Arquivos de inserção em massa)
				|-- utils (Recursos sendo utilizados em mais de um lugar da aplicação)
			|-- index.ts (Arquivo de inicialização)
			|-- package.json
			|-- tsconfig.json (COnfigurações de compilação do TypeScript)			



## Instalação

1. Baixe o diretório para sua máquina
```
git clone https://github.com/carlos-504/medipreco-backend-challenge.git
```

2. Para baixar as dependências do projeto
```
npm install
```
3. Crie o arquivo de variáveis (.env) e copie o conteúdo dos arquivos .env.example para o mesmo

4. Crie um banco de dados (Postgres) em sua máquina com nome 'brazilian_champions'
```
CREATE DATABASE brazilian_champions;
```
5. Para iniciar a aplicação
```
npm start
```
6. Em caso de erro, verifique se credenciais do arquivo config.json e compátivel com os da sua máquina

## REST API
O sistema conta com uma API para realizar os CRUDS. A API segue o protocolo Rest de comunicação, 
onde é possível realizar uma comunicação com o servidor para obter, incluir ou remover os dados do banco.

**Obs.:** Ao utilizar a API, envie sempre os cabeçalhos obrigatórios:

	"Accept: application/json
	"Content-Type: application/json"

### API Endpoints

| Ação                | Método de requisição | Endpoint            | Request Body                                 | Retorno                                            |
|---------------------|----------------------|---------------------|----------------------------------------------|----------------------------------------------------|
| Os times com mais de dois títulos | GET                 | tournament/champios-with-more-titles            |  | team, titles |
| O time com mais artilheiros em todos os campeonatos    | GET                 | striker/team-with-more-strikers               |                               | team, strikers |
| Os cinco (5) principais artilheiros da história do campeonato   | GET                 | striker/top-strikers              |                 | Objetos JSON com todas as tags     |
| O time com mais vice-campeonatos da história  | GET                  | tournament/team-most-vice-champions       |                   | team, titles                     |
| Os times que mais ficaram classificados entre os quatro primeiros colocados, porém nunca venceram o campeonato brasileiro    | GET                 | /tournament/top-ranked-teams      |                | Objetos JSON com todas as tags            |
| A lista de artilheiros que possuem determinada quantidade de gols| POST                  | /striker/list-by-goals  | goals: number                                             | Objetos JSON com todas as tags                                                   |
| Atualizar striker  | PUT                  | striker/update/{id} | topScorer:[{player: namePlayer, team: nameTeam}], goals: number |                                                    |
| Deletar striker    | DELETE               | striker/delete/{id} |                                              |                                                    |
| Listar striker     | GET                  | striker/list        |                                              |                                                    |
| Incluir striker    | POST                 | striker/store       | topScorer:[{player: namePlayer, team: nameTeam}], goals: number |                                                    |
| striker específico | GET                  | striker/index/{id}  |                                              |                                                    |
| Atualizar tournament  | PUT                  | tournament/update/{id} | year: number, first: nameTeam, second: nameTeam, third: nameTeam, fourth: nameTeam, StrikerId: number |                                                    |
| Deletar tournament    | DELETE               | tournament/delete/{id} |                                              |                                                    |
| Listar tournament     | GET                  | tournament/list        |                                              |                                                    |
| Incluir tournament    | POST                 | tournament/store       | year: number, first: nameTeam, second: nameTeam, third: nameTeam, fourth: nameTeam, StrikerId: number |                                                    |
| tournament específico | GET                  | tournament/index/{id}  |                                              |                


### Link do projeto em produção

http://34.139.184.209
