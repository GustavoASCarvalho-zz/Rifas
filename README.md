<p align="center">
  <img alt="rifa" src="https://lh3.googleusercontent.com/proxy/3J7fsQAl_u63eTMklkOYv90oqPkSMxVUrHYsGoiHjtHGNnr1QtOFahOOeRsa5fHjCNpsdYjkYPKiBRHA2B0c-GyZZnYK6FbwsTYu0yc_IPJOOso-qrYE7365EFhjTqxBhrT-XSSJ64I-d-9BOkUFOlEaSgvsUhsiNQWgzP0bQKwAbiJ2bDUvcf8p9wgZcjYIv2-5GVrWcN70HjscGJoPHylKMwnnByoFNaNDT20WqbBKwGtyJL_f7pB97ZBezpc1JlDBN_OoaHWfBDnvNNYgAdB3MES7S6qqex7dJ7efgCe9P6kqj3jAdi9Ue91Gdnm3" width="100px" />
  <h1 align="center">Gerênciamento de rifas</h1>
</p>

Você acaba de encontrar nosso repositório de gerenciamento de rifas no GitHub, nele você podera cadastrar suas rifas com seus respectivos prêmios, vender e realizar sorteios

## Index

- [Index](#index)
- [Como rodar](#como-rodar)
- [Classes](#classes)
- [CheckList](#checklist)
- [Participantes](#participantes)

## Como rodar

Requisitos

- nodejs^14.17.0
- npm^6.14.12
- postgresql^13

Na raiz do projeto

- Criar o arquivo .env seguindo os padrões do .env.example

```shell
  npm i                   # Instala as dependencias do projeto
  node ace migration:run  # Inicializa o banco de dados
  node ace db:seed        # Insere alguns dados de teste no banco de dados
  node ace serve          # Roda um servidor local para visualização do projeto
```

## Classes

- Rifas
- Usuarios
- Tipos
- Prêmios
- Bilhetes

## CheckList

- [x] Implementação do [AdonisJS](https://adonisjs.com/)
- [x] Criação de rotas primarias (Home, About)
- [x] Implementação do [Bootstrap](https://getbootstrap.com/)
- [x] Implementação do banco de dados Postgresql
- [x] Models e imigrations aplicados
- [x] Autenticação adicionada
- [x] Atribuição de relações
- [x] Criação de um seeder paro banco de dados
- [ ] ???
- [ ] Estilização de paginas
- [ ] ???
- [ ] ???

## Participantes

1. [@FelipeNaoto](https://github.com/felipeinfo18)
2. [@GustavoAlexandre](https://github.com/GustavoASCarvalho)
