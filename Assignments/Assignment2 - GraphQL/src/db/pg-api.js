// Inspired by example from class
import Room from '../schema/types/room';
import pgClient from './pg-client';


const postgres_to_room_fields = `uid,  available, comment, floor,  hasowntub AS "hasOwnTub", roomnumber AS "roomNumber", 
bedamount AS "bedAmount", bedtype AS "bedType", roomserviceavailable AS "roomServiceAvailable", 
soundproof AS "soundProof"`

const pgApiWrapper = async () => {
    const { pgPool } = await pgClient();
    const pgQuery = (text, params = {}) =>
        pgPool.query(text, Object.values(params));

    return {
        roomMainList: async () => {
          const res = await pgQuery(`
            SELECT  ${postgres_to_room_fields}
            FROM rooms
            LIMIT 100
          `);
          return res.rows;
        },
        roomFind: async (uid) => {
          const res = await pgQuery(`
            SELECT ${postgres_to_room_fields}
            FROM rooms 
            WHERE uid like '${uid}'
          `);
          return res.rows[0]; // First room found
        },
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
            //** Rooms */

            // POST
            roomCreate: async (room) => {
              const pgResp = await pgQuery(`
                INSERT INTO rooms (uid, roomnumber, available, comment, floor, bedamount, bedtype, roomserviceavailable, soundproof, hasowntub)
                VALUES
                (
                  ${room.uid}, ${room.roomNumber}, ${room.available},
                  '${room.comment}', '${room.floor}', ${room.bedAmount}, 
                  '${room.bedType}', ${room.roomServiceAvailable}, 
                  ${room.soundProof}, ${room.hasOwnTub}
                )
                RETURNING ${postgres_to_room_fields}
                ;
              `)

              // Could not get return rooms to work.. 
              if(pgResp.rowCount > 0) {
                return pgResp.rows[0] 
              } else {
                return null; // Bad but could not get type with both errors and room to work.. 
              }
            }
            // PATCH 
            
            // DELETE

            //****************************/
        },
    };
};
export default pgApiWrapper;