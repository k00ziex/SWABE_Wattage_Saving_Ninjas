import pg from 'pg';
export default async function pgClient() {
    const pgPool = new pg.Pool({
        connectionString: "postgresql://postgres:somePassword@127.0.0.1:5432/postgres",
    });
    // Test the connection
    const client = await pgPool.connect();
    const tableCountResp = await client.query(
        'select count(*) from information_schema.tables where table_schema = $1;', ['azdev']
    );
    client.release();
    console.log('Connected to PostgreSQL | Tables count:', tableCountResp.rows[0].count);
    pgPool.on('error', (err: Error) => {
    console.error('Unexpected PG client error', err);
    process.exit(-1);
});
    return {
        pgPool,
        pgClose: async () => await pgPool.end(),
    };
}



// // TYPESCRIPT 

// import { Client } from 'ts-postgres';

// export default async function getClient() {
//     const client = new Client({
//         host: "127.0.0.1", 
//         port: 5432,
//         user: "postgres",
//         password: "somePassword",
//         database: "postgres"
//     });

//     await client.connect();
//     return client;
// }

// export async function testClient() {
//     const client = new Client({
//         host: "127.0.0.1", 
//         port: 5432,
//         user: "postgres",
//         password: "somePassword",
//         database: "postgres"
//     });

//     await client.connect();

//     try {
//         // Querying the client returns a query result promise
//         // which is also an asynchronous result iterator.
//         const result = client.query(
//             "SELECT 'Hello ' || $1 || '!' AS message",
//             ['there']
//         );

//         for await (const row of result) {
//             // 'Hello world!'
//             console.log(row.get('message'));
//         }
//     } finally {
//         await client.end();
//     }
// }
