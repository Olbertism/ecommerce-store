import camelcaseKeys from 'camelcase-keys';
import { config } from 'dotenv-safe';
import postgres from 'postgres';
import { DatabaseItemsType } from './types';

config();

// Type needed for the connection function below
declare module globalThis {
  let postgresSqlClient: ReturnType<typeof postgres> | undefined;
}

// Connect only once to the database (next.js bug workaround)
// https://github.com/vercel/next.js/issues/7811#issuecomment-715259370
function connectOneTimeToDatabase() {
  let sql;

  if (process.env.NODE_ENV === 'production' && process.env.DATABASE_URL) {
    // Heroku needs SSL connections but
    // has an "unauthorized" certificate
    // https://devcenter.heroku.com/changelog-items/852
    sql = postgres({ ssl: { rejectUnauthorized: false } });
  } else {
    if (!globalThis.postgresSqlClient) {
      globalThis.postgresSqlClient = postgres();
    }
    sql = globalThis.postgresSqlClient;
  }

  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

// Functions for item inventory
export async function getItems() {
  let items: DatabaseItemsType[] | undefined = [];
  try {
    items = await sql<DatabaseItemsType[]>`
    SELECT * FROM items
  `;
  } catch (error) {
    console.log(error);
  }

  return items.map((item: DatabaseItemsType) => camelcaseKeys(item));
}

export async function getItem(id: number) {
  const [item] = await sql<[DatabaseItemsType | undefined]>`
    SELECT
      *
    FROM
      items
    WHERE
      item_id = ${id}
  `;
  return item && camelcaseKeys(item);
}
