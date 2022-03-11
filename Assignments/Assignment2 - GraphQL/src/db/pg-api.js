import pgClient from './pg-client';

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
            
          
        },
    };
};
export default pgApiWrapper;