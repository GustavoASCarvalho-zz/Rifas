import Env from '@ioc:Adonis/Core/Env'
import Application from '@ioc:Adonis/Core/Application'
import { DatabaseConfig } from '@ioc:Adonis/Lucid/Database'

// to heroku

import Url from 'url-parse'

const databaseUrl = new Url(Env.get('DATABASE_URL'))

const databaseConfig: DatabaseConfig = {
  connection: Env.get('DB_CONNECTION'),

  connections: {
    sqlite: {
      client: 'sqlite',
      connection: {
        filename: Application.tmpPath('db.sqlite3'),
      },
      migrations: {
        naturalSort: true,
      },
      useNullAsDefault: true,
      healthCheck: false,
      debug: false,
    },
    pg: {
      client: 'pg',
      connection: {
        host: databaseUrl.hostname as string,
        port: databaseUrl.port as number,
        user: databaseUrl.username as string,
        password: databaseUrl.password as string,
        database: databaseUrl.pathname.substr(1) as string,
        ssl: {
          rejectUnauthorized: false,
        },
      },
      migrations: {
        naturalSort: true,
      },
      healthCheck: false,
      debug: false,
    },
  },
}

// para produzir

// const databaseConfig: DatabaseConfig = {
//   connection: Env.get('DB_CONNECTION'),

//   connections: {
//     sqlite: {
//       client: 'sqlite',
//       connection: {
//         filename: Application.tmpPath('db.sqlite3'),
//       },
//       migrations: {
//         naturalSort: true,
//       },
//       useNullAsDefault: true,
//       healthCheck: false,
//       debug: false,
//     },
//     pg: {
//       client: 'pg',
//       connection: {
//         host: Env.get('PG_HOST'),
//         port: Env.get('PG_PORT'),
//         user: Env.get('PG_USER'),
//         password: Env.get('PG_PASSWORD', ''),
//         database: Env.get('PG_DB_NAME'),
//       },
//       migrations: {
//         naturalSort: true,
//       },
//       healthCheck: false,
//       debug: false,
//     },
//   },
// }

export default databaseConfig
