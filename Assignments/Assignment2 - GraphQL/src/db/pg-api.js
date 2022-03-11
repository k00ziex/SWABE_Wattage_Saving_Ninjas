import pgClient from './pg-client';
import { randomString } from '../utils';

const pgApiWrapper = async () => {
    const { pgPool } = await pgClient();
    const pgQuery = (text, params = {}) =>
        pgPool.query(text, Object.values(params));
    return {
        taskMainList: async () => {
            const pgResp = await pgQuery(`
                SELECT id, content, tags, user_id AS "userId",
                approach_count AS "approachCount", is_private AS "isPrivate",
                created_at AS "createdAt"
                FROM azdev.tasks
                WHERE is_private = FALSE
                ORDER BY created_at DESC
                LIMIT 100               
            `);
            return pgResp.rows;
        },
        usersInfo: async (userIds) => {
            const pgResp = await pgQuery(`
                SELECT id, username, first_name AS "firstName", last_name AS "lastName",
                created_at AS "createdAt"
                FROM azdev.users
                WHERE id = ANY ($1)
            `, { $1: userIds });
            return userIds.map((userId) =>
              pgResp.rows.find((row) => userId === row.id)
            );
          },
        approachList: async (taskId) => {
            const pgResp = await pgQuery(`
                SELECT id, content, user_id AS "userId", task_id AS "taskId",
                vote_count AS "voteCount", created_at AS "createdAt"
                FROM azdev.approaches
                WHERE task_id = $1
                ORDER BY vote_count DESC, created_at DESC
            `, {
                $1: taskId,
            });
            return pgResp.rows;
        },
        mutators: {
            userCreate: async ({ input }) => {
              const payload = { errors: [] };
              if (input.password.length < 6) {
                payload.errors.push({
                  message: 'Use a stronger password',
                });
              }
              if (payload.errors.length === 0) {
                const authToken = randomString();
                const pgResp = await pgQuery( `
                INSERT INTO azdev.users (username, hashed_password, first_name, last_name, hashed_auth_token)
                VALUES ($1, crypt($2, gen_salt('bf')), $3, $4, crypt($5, gen_salt('bf')))
                RETURNING id, username, first_name AS "firstName", last_name AS "lastName", created_at AS "createdAt"
              `, {
                  $1: input.username.toLowerCase(),
                  $2: input.password,
                  $3: input.firstName,
                  $4: input.lastName,
                  $5: authToken,
                });
                if (pgResp.rows[0]) {
                  payload.user = pgResp.rows[0];
                  payload.authToken = authToken;
                }
              }
              return payload;
            },
        },
    };
};
export default pgApiWrapper;