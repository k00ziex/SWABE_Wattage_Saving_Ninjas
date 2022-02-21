import { Request, Response } from 'express'
import fetch from 'node-fetch'


// These paths should point to the dataseeding files
const userFilepath = "../../Dataseeding/userDataseeding.json"
const roomFilepath = "../../Dataseeding/roomDataseeding.json"

export const seedRoomDatabase = async (req: Request, res: Response) => {  
    var rooms = require(roomFilepath)
    let idArray: any[] = [] // Create array to return all the IDs we create
    let i = 0

    // We use a for loop to iterate through the dataseeding objects because a foreach does not "wait" for
    // the awaits we designate.
    for (let index = 0; index < rooms.length; index++){
        const uid = rooms[index]["roomNumber"]

        // We use node-fetch to create a "POST"-call to our room router
        const response = await fetch(`http://127.0.0.1:3000/rooms/${uid}`, {
            method: 'POST',
            body: JSON.stringify(rooms[index]),
            headers: {'Content-Type': 'application/json'}
        }).then(res => {
            if(res.status != 200){
                console.log(`An error occurred during Room seeding.
                            Statuscode: ${res.status}, 
                            message: ${res.statusText}`)
            } else {
                res.json().then(data => {
                    try{
                        console.log(data["_id"]) // The data object is unknown, yes, but we know that it is a JSON object
                        idArray[i] = data["_id"]
                        i++
                    } catch(e){
                        console.log(`An error occured: ${e}`)
                    }
                })
            }
        })
    }
    if(idArray.length > 0){ // If the length of the array is 0 (or less), then we know nothing was created
        res.json({roomsCreated: idArray.length, arrayOfIds: idArray})
    } else {
        res.status(400).json({message: "An error occured during dataseeding, no rooms could be created. "
                            + "Check if the rooms already exist in your database and try again."})
    }
}

export const seedUserDatabase = async (req: Request, res: Response) => {  
    // Do call to "create"-endpoint with each line of the dataseeding file
    var users = require(userFilepath)
    let idArray: any[] = [] // Create array to use for returning all the IDs of users created
    let i = 0
        
    for (let index = 0; index < users.length; index++) {
        const response = await fetch('http://127.0.0.1:3000/user', { // Do POST via node-fetch to the user create endpoint
            method: 'POST', 
            body: JSON.stringify(users[index]),
            headers: {'Content-Type': 'application/json'}
        }).then(res => {
            if(res.status != 200){
                console.warn(`An error occurred when posting. 
                            Statuscode: ${res.status},
                            message: ${res.statusText}`)
            } else{
                res.json().then(data => {
                    try{
                        console.log(data["_id"]) // The object is unknown, yes, but we know it's a JSON object
                        idArray[i] = data["_id"]
                        i++
                    } catch(e){
                        console.log(`An error occured: ${e}`)
                    }
                })
            }
        })
    }
    if(idArray.length > 0){ // If the length of the array is 0 (or less), then we know nothing was created
        res.json({usersCreated: idArray.length, arrayOfIds: idArray})
    } else {
        res.status(400).json({message: "An error occured during dataseeding, no users could be created. "
                            + "Check if the users already exist in your database and try again."})
    }
}