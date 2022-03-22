// Inspired by example from class
import Room from '../schema/types/room';
import pgClient from './pg-client';

//** To deal with the fact that roomNumber is roomnumber, etc, in the DB */
const POSTGRESFIELDNAMES_TO_ROOMFIELDNAMES = `uid,  available, comment, floor,  hasowntub AS "hasOwnTub", roomnumber AS "roomNumber", 
bedamount AS "bedAmount", bedtype AS "bedType", roomserviceavailable AS "roomServiceAvailable", 
soundproof AS "soundProof"`

const POSTGRESFIELDNAMES_TO_RESERVATIONFIELDNAMES = `
uid, comments, roomuid as "roomUID", fromdate AS "fromDate", todate AS "toDate",
nameofreserver AS "nameOfReserver", emailofreserver AS "emailOfReserver"
`

const POSTGRES_RESERVATION_ROOM_JOIN =`
res.uid, res.comments, res.roomuid as "roomUID", res.fromdate AS "fromDate", res.todate AS "toDate",
res.nameofreserver AS "nameOfReserver", res.emailofreserver AS "emailOfReserver",

room.uid AS "room_uid", room.roomnumber AS "room_roomNumber", room.available AS "room_available", 
room.comment AS "room_comment", room.floor AS "room_floor", room.bedamount AS "room_bedAmount", 
room.bedtype AS "room_bedType", room.roomserviceavailable AS "room_roomServiceAvailable", 
room.soundproof AS "room_soundProof", room.hasowntub AS "room_hasOwnTub"
 

`

const pgApiWrapper = async () => {
    const { pgPool } = await pgClient();
    const pgQuery = (text, params = {}) =>
        pgPool.query(text, Object.values(params));

    return {
      queries: {
        roomMainList: async () => {
          const res = await pgQuery(`
            SELECT  ${POSTGRESFIELDNAMES_TO_ROOMFIELDNAMES}
            FROM rooms
            LIMIT 100
          `);
          return res.rows;
        },
        roomFind: async (uid) => {
          const res = await pgQuery(`
            SELECT ${POSTGRESFIELDNAMES_TO_ROOMFIELDNAMES}
            FROM rooms 
            WHERE uid like '${uid}'
          `);
          return res.rows[0]; // First room found
        },
        //************ Reservations */
        reservationMainList: async() => {
          const dbResponse = await pgQuery(`
          SELECT  
            ${POSTGRES_RESERVATION_ROOM_JOIN}
            FROM reservations res
            JOIN rooms room ON (res.roomuid like room.uid)
            LIMIT 100
          `);
          dbResponse.rows.forEach(element => {
            console.log(element);
          });
          return dbResponse.rows;
        },

        reservationFind: async(uid) => {
          const dbResponse = await pgQuery(`
          SELECT ${POSTGRES_RESERVATION_ROOM_JOIN}
          FROM reservations res 
          JOIN rooms room ON (res.roomuid like room.uid)
          WHERE res.uid like '${uid}'
          `);
          return dbResponse.rows[0];
        }
        //************************* */
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
              RETURNING ${POSTGRESFIELDNAMES_TO_ROOMFIELDNAMES}
              ;
            `)

            // Could not get return rooms to work.. 
            if(pgResp.rowCount > 0) {
              return pgResp.rows[0] 
            } else {
              return null; // Bad but could not get type with both errors and room to work.. 
            }
          },
          // PATCH 
          roomModify: async(room) => {
            const dbResponse = await pgQuery(`
            UPDATE rooms
            SET 
                roomnumber = ${room.roomNumber},
                available = ${room.available},
                comment = '${room.comment}',
                floor = '${room.floor}', 
                bedamount = ${room.bedAmount},
                bedtype = '${room.bedType}',
                roomserviceavailable = ${room.roomServiceAvailable},
                soundproof = ${room.soundProof},
                hasowntub = ${room.hasOwnTub}
            WHERE uid like '${room.uid}'
            RETURNING ${POSTGRESFIELDNAMES_TO_ROOMFIELDNAMES}
            `);
            if(dbResponse.rowCount > 0) {
              return dbResponse.rows[0];
            } else {
              throw new Error("Could not modify room");
            }
          },
          // DELETE
          roomDelete: async(uid) => {
            const dbResponse = await pgQuery(`
            DELETE FROM 
              rooms
            WHERE
              uid like '${uid}'
            `)
            
            if(dbResponse.rowCount > 0){
              return `Deleted room with uid: ${uid}`;
            } else {
              return `Could not delete room with uid: ${uid}`;
            }
          },
          //****************************/
          /* Reservation Start */
          reservationCreate: async (reservation) => {
            console.log(reservation.room.uid)
            console.log(reservation.room.uid)
            console.log(reservation.nameOfReserver)
            const pgResponse = await pgQuery(`
            INSERT INTO reservations (uid, roomuid, fromdate, todate, nameofreserver, emailofreserver, comments)
            VALUES
            (
              ${reservation.uid}, ${reservation.room.uid}, '${reservation.fromDate}',
              '${reservation.toDate}', '${reservation.nameOfReserver}','${reservation.emailOfReserver}', '${reservation.comments}'
            )

            RETURNING ${POSTGRESFIELDNAMES_TO_RESERVATIONFIELDNAMES}
            ;
            `)
            
            if(pgResponse.rowCount > 0) {
              // I would like personally to say sorry to whoever is reading this, im bad at javascript
              // Set each room as no longer available
              pgResponse.rows.forEach(async element => {
                console.log(element)
                // Find room
                const res = await pgQuery(`
                  SELECT ${POSTGRESFIELDNAMES_TO_ROOMFIELDNAMES}
                  FROM rooms 
                  WHERE uid like '${element.roomUID}'
                `);

                let room = res.rows[0]
                room.available = false
                // Set room

                const dbResponse = await pgQuery(`
                UPDATE rooms
                SET 
                    roomnumber = ${room.roomNumber},
                    available = ${room.available},
                    comment = '${room.comment}',
                    floor = '${room.floor}', 
                    bedamount = ${room.bedAmount},
                    bedtype = '${room.bedType}',
                    roomserviceavailable = ${room.roomServiceAvailable},
                    soundproof = ${room.soundProof},
                    hasowntub = ${room.hasOwnTub}
                WHERE uid like '${room.uid}'
                `);
              });
              return pgResponse.rows[0] 
            } else {
              return null; // Bad but could not get type with both errors and room to work.. 
            }
            
          },

          reservationModify: async (reservation) => {
            const pgResponse = await pgQuery(`
            UPDATE reservations
            SET 
                roomuid = ${reservation.room.uid},
                fromdate = '${reservation.fromDate}',
                todate = '${reservation.toDate}',
                nameofreserver = '${reservation.nameOfReserver}', 
                emailofreserver = '${reservation.emailOfReserver}',
                comments = '${reservation.comments}'
            WHERE uid like '${reservation.uid}'
            RETURNING ${POSTGRESFIELDNAMES_TO_RESERVATIONFIELDNAMES}
            `)

            return pgResponse.rows[0]
          },

          reservationDelete: async(uid) => {
            const dbResponse = await pgQuery(`
            DELETE FROM
              reservations
            WHERE
              uid like '${uid}'            
            `)
            if(dbResponse.rowCount > 0){
              return `Deleted reservation with uid: ${uid}`
            } else{
              return `Could not delete reservation with uid: ${uid}`
            }
          }

          /* Reservation End */

      },
    };
};

export default pgApiWrapper;