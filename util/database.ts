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
  if (!globalThis.postgresSqlClient) {
    globalThis.postgresSqlClient = postgres();
  }
  const sql = globalThis.postgresSqlClient;

  return sql;
}

// Connect to PostgreSQL
const sql = connectOneTimeToDatabase();

// Functions for item inventory
export async function getItems() {
  const items = await sql<DatabaseItemsType[]>`
    SELECT * FROM items
  `;
  
  return items.map((item) => camelcaseKeys(item));
}

export async function getItem(id : number) {
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
