// Inspired by example from class
import Room from '../schema/types/room';
import pgClient from './pg-client';

//** To deal with the fact that roomNumber is roomnumber, etc, in the DB */
const postgresFieldNames_to_roomFieldNames = `uid,  available, comment, floor,  hasowntub AS "hasOwnTub", roomnumber AS "roomNumber", 
bedamount AS "bedAmount", bedtype AS "bedType", roomserviceavailable AS "roomServiceAvailable", 
soundproof AS "soundProof"`

const pgApiWrapper = async () => {
    const { pgPool } = await pgClient();
    const pgQuery = (text, params = {}) =>
        pgPool.query(text, Object.values(params));

    return {
      queries: {
        roomMainList: async () => {
          const res = await pgQuery(`
            SELECT  ${postgresFieldNames_to_roomFieldNames}
            FROM rooms
            LIMIT 100
          `);
          return res.rows;
        },
        roomFind: async (uid) => {
          const res = await pgQuery(`
            SELECT ${postgresFieldNames_to_roomFieldNames}
            FROM rooms 
            WHERE uid like '${uid}'
          `);
          return res.rows[0]; // First room found
        },
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
              RETURNING ${postgresFieldNames_to_roomFieldNames}
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