projeto sobre NPS: Net Promoter Score. (Pesquisa de satisfação)
1. Cadastro de Usuário
2. Cadastro de Perguntas
3. Uso de Ethereal Email para email fake

Uma API promove a interação entre um cliente e um servidor.
Node recebe as requisições asíncronamente,
TypeScript - Superset do javascript que dentre outras coisas adiciona
tipagem.
Express - microFramework do node que auxilia na criação de servidores

3 tipos de parâmetros:

Route Params - Parametros que compõe a rota identificado após a / 
                          routes.get("/answers/:value")
Query Params - Busca, paginação, não obrigatórios identificado por ? chave=valor

Body Params -


Dependências
  "@types/uuid": "^8.3.0",    -- criação de id's unicos
    "express": "^4.17.1",     -- servidor
    "handlebars": "^4.7.7",   -- criação de respostas html presonalizadas
    "nodemailer": "^6.4.18",  -- envio de email's
    "reflect-metadata": "^0.1.13", --
    "sqlite3": "^5.0.2",	  -- bd
    "typeorm": "^0.2.31",	  -- auxilia na comunicação com o bd abstraindo detalhes. Possibilidade de utilizar migrations dentre outros
    "uuid": "^8.3.2"        

"devDependencies": {
    "@types/express": "^4.17.11",
    "@types/jest": "^26.0.20",
    "@types/nodemailer": "^6.4.0",
    "@types/supertest": "^2.0.10",
    "jest": "^26.6.3",        -- testes
    "supertest": "^6.1.3",    -- auxilia na aplicação de testes de integração simulando requisições.
    "ts-jest": "^26.5.2",    
    "ts-node-dev": "^1.1.1",
    "typescript": "^4.1.5"
  }