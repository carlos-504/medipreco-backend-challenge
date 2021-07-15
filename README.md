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
     ```npm start```
* Para criar os arquivos JavaScript através dos arquivos TypeScript do diretório
    ```npm run build```
* Para executar a aplicação gerada no build
    ```npm run server```
    

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
CREATE DATABASE tempo_telecom;
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

### Exemplo de uso da API com a ferramenta de linha de comando cURL

#### Registro de usuário

	curl -X POST http://localhost/register \
	 -H "Accept: application/json" \
	 -H "Content-Type: application/json" \
	 -d '{"name": "Paulo", "email": "paulo.dev@example.com", "password": "dev1234", "password_confirmation": "dev1234"}'

##### Retorno:

	{
	    "data": {
	        "api_token":"0syHnl0Y9jOIfszq11EC2CBQwCfObmvscrZYo5o2ilZPnohvndH797nDNyAT",
	        "created_at": "2020-02-20 21:17:15",
	        "email": "paulo.dev@example.com",
	        "id": 51,
	        "name": "Paulo",
	        "updated_at": "2020-02-20 21:17:15"
	    }
	}

#### Login de usuário

	curl -X POST http://localhost/login \
	  -H "Accept: application/json" \
	  -H "Content-type: application/json" \
	  -d "{\"email\": \"paulo.dev@example.com\", \"password\": \"dev1234\" }"


##### Retorno:

	{
	    "data": {
	        "id":1,
	        "name":"Paulo",
	        "email":"paulo.dev@example.com",
	        "created_at":"2020-02-20 21:17:15",
	        "updated_at":"2020-02-20 21:17:15",
	        "api_token":"Jll7q0BSijLOrzaOSm5Dr5hW9cJRZAJKOzvDlxjKCXepwAeZ7JR6YP5zQqnw"
	    }
	}


#### Logout de usuário

	curl -X POST http://localhost/logout \
	  -H "Authorization: Bearer <api_token>"


##### Retorno:

	{
	    "data": "User logged out."
	}

#### Todos os clientes

	curl -X GET http://localhost/clientes \
	  -H "Accept: application/json" \
	  -H "Content-type: application/json"
	  -H "Authorization: Bearer <api_token>"


##### Retorno:

	[
	    {
	        "id": 1,
	        "name": "Jarrett Stoltenberg",
	        "email": "clark.rice@example.net",
	        "created_at": "2020-02-27 20:37:26",
	        "updated_at": "2020-02-27 20:37:26",
	        "tagged": [
	            {
	                "id": 101,
	                "taggable_id": 1,
	                "taggable_type": "App\\Cliente",
	                "tag_name": "Joshua King",
	                "tag_slug": "joshua-king",
	                "tag": {
	                    "id": 101,
	                    "tag_group_id": null,
	                    "slug": "joshua-king",
	                    "name": "Joshua King",
	                    "suggest": 0,
	                    "count": 1
	                }
	            }
	        ]
	    },
	    {
	        "id": 2,
	        "name": "Mr. Keagan Shields II",
	        "email": "rosie.schimmel@example.net",
	        "created_at": "2020-02-27 20:37:26",
	        "updated_at": "2020-02-27 20:37:26",
	        "tagged": [
	            {
	                "id": 102,
	                "taggable_id": 2,
	                "taggable_type": "App\\Cliente",
	                "tag_name": "Jordan Balistreri",
	                "tag_slug": "jordan-balistreri",
	                "tag": {
	                    "id": 102,
	                    "tag_group_id": null,
	                    "slug": "jordan-balistreri",
	                    "name": "Jordan Balistreri",
	                    "suggest": 0,
	                    "count": 1
	                }
	            }
	        ]
	    }
	] 

##### Paramêtros

É possível informar os parâmetros `offset` e/ou `limit`. Exemplo:
	
	curl -X GET http://localhost/clientes?offset=30&limit=50 \
	  -H "Accept: application/json" \
	  -H "Content-type: application/json"

Valores padrão:
`offset` = 0
`limit` = 50

#### Cliente específico

	curl -X GET http://localhost/clientes/1 \
	  -H "Accept: application/json" \
	  -H "Content-type: application/json"
	  -H "Authorization: Bearer <api_token>"


##### Retorno:

	{
	    "id": 1,
	    "name": "Jarrett Stoltenberg",
	    "email": "clark.rice@example.net",
	    "created_at": "2020-02-27 20:37:26",
	    "updated_at": "2020-02-27 20:37:26",
	    "tagged": [
	        {
	            "id": 101,
	            "taggable_id": 1,
	            "taggable_type": "App\\Cliente",
	            "tag_name": "Joshua King",
	            "tag_slug": "joshua-king",
	            "tag": {
	                "id": 101,
	                "tag_group_id": null,
	                "slug": "joshua-king",
	                "name": "Joshua King",
	                "suggest": 0,
	                "count": 1
	            }
	        }
	    ]
	} 	       

#### Novo cliente

	curl -X POST http://localhost/clientes \
	  -H "Accept: application/json" \
	  -H "Content-type: application/json"
	  -H "Authorization: Bearer <api_token>"
	  -d '{"name": "Luiz Carlos", "email": "luizera@example.com", "tags": "tag1, tag2, tag3"}'


##### Retorno:

	{
	    "id": 57,
	    "name": "Luiz Carlos",
	    "email": "luizera@example.com",
	    "created_at": "2020-02-28 19:18:46",
	    "updated_at": "2020-02-28 19:18:46",
	    "tagged": [
	        {
	            "id": 160,
	            "taggable_id": 57,
	            "taggable_type": "App\\Cliente",
	            "tag_name": "Tag1",
	            "tag_slug": "tag1",
	            "tag": {
	                "id": 151,
	                "tag_group_id": null,
	                "slug": "tag1",
	                "name": "Tag1",
	                "suggest": 0,
	                "count": 1
	            }
	        },
	        {
	            "id": 161,
	            "taggable_id": 57,
	            "taggable_type": "App\\Cliente",
	            "tag_name": "Tag2",
	            "tag_slug": "tag2",
	            "tag": {
	                "id": 152,
	                "tag_group_id": null,
	                "slug": "tag2",
	                "name": "Tag2",
	                "suggest": 0,
	                "count": 1
	            }
	        },
	        {
	            "id": 162,
	            "taggable_id": 57,
	            "taggable_type": "App\\Cliente",
	            "tag_name": "Tag3",
	            "tag_slug": "tag3",
	            "tag": {
	                "id": 153,
	                "tag_group_id": null,
	                "slug": "tag3",
	                "name": "Tag3",
	                "suggest": 0,
	                "count": 1
	            }
	        }
	    ]
	}	       

#### Atualizar cliente

	curl -X PUT http://localhost/clientes/1 \
	  -H "Accept: application/json" \
	  -H "Content-type: application/json"
	  -H "Authorization: Bearer <api_token>"
	  -d '{"name": "Stoltenberg Jarrett"}'


##### Retorno:

	{
	    "id": 1,
	    "name": "Stoltenberg Jarrett",
	    "email": "clark.rice@example.net",
	    "created_at": "2020-02-27 20:37:26",
	    "updated_at": "2020-02-28 19:27:39",
	    "tagged": []
	}

#### Deletar cliente

	curl -X POST http://localhost/clientes/1 \
	  -H "Accept: application/json" \
	  -H "Content-type: application/json"
	  -H "Authorization: Bearer <api_token>"


##### Retorno:

	null

#### Todas as tags

	curl -X GET http://localhost/tags \
	  -H "Accept: application/json" \
	  -H "Content-type: application/json"
	  -H "Authorization: Bearer <api_token>"


##### Retorno:

	[
	    {
	        "slug": "participantes-da-maratona",
	        "name": "Participantes da Maratona",
	        "count": 2
	    },
	    {
	        "slug": "alexanne-buckridge",
	        "name": "Alexanne Buckridge",
	        "count": 2
	    },
	    {
	        "slug": "amalia-fahey",
	        "name": "Amalia Fahey",
	        "count": 2
	    }
	]    

##### Paramêtros

Se o parâmetro `key` for informado, será retornado apenas o valor da chave desejada. Exemplo:
	
	curl -X GET http://localhost/tags?key=name \
	  -H "Accept: application/json" \
	  -H "Content-type: application/json"

Valores possíveis para o parâmetro `key`: slug, name ou count.

## Libs de terceiros utilizadas

### Node

* lib 1
* lib 2

### React

* lib 1
* lib 2

## References

* https://docs.docker.com/compose/
