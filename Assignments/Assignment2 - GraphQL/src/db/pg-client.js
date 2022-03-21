// Plagiarized shamelessly from Poul Ejnar Demo. 
import pg from 'pg';

import { pgConnectionString } from '../config';

export default async function pgClient() {
  const pgPool = new pg.Pool({
    connectionString: "postgresql://postgres:somePassword@127.0.0.1:5432/assignment2",
  });

  // Test the connection
  const client = await pgPool.connect();
  const tableCountResp = await client.query(
    'select count(*) from information_schema.tables where table_schema = $1;',
    ['assignment2']
  );
  client.release();

  console.log(
    'Connected to PostgreSQL | Tables count:',
    tableCountResp.rows[0].count
  );

  pgPool.on('error', (err) => {
    console.error('Unexpected PG client error', err);
    process.exit(-1);
  });

  return {
    pgPool,
    pgClose: async () => await pgPool.end(),
  };
}
