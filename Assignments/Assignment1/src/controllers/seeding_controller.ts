import { Request, Response } from 'express'
import fetch from 'node-fetch'
import { createUser } from './user_controller'



const userFilepath = "../../userDataseeding.json"
const roomFilepath = "../../roomDataseeding.json"

export const seedRoomDatabase = async (req: Request, res: Response) => {  
    var rooms = require(roomFilepath)
    let idArray: any[] = []
    let i = 0

    for (let index = 0; index < rooms.length; index++){
        const uid = rooms[index]["roomNumber"]
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
                        console.log(data["_id"])
                        idArray[i] = data["_id"]
                        i++
                    } catch(e){
                        console.log(`An error occured: ${e}`)
                    }
                })
            }
        })
    }
    if(idArray.length > 0){
        res.json({roomsCreated: idArray.length, arrayOfIds: idArray})
    } else {
        res.status(400).json({message: "An error occured during dataseeding, no rooms could be created. "
                            + "Check if the rooms already exist in your database and try again."})
    }
}

export const seedUserDatabase = async (req: Request, res: Response) => {  
    // Do call to "create"-endpoint with each line of the dataseeding file
        var users = require(userFilepath)
        let idArray: any[] = []
        let i = 0
        
        for (let index = 0; index < users.length; index++) {
            const response = await fetch('http://127.0.0.1:3000/user', {
                method: 'POST', 
                body: JSON.stringify(users[index]),
                headers: {'Content-Type': 'application/json'}
            }).then(res => {
                if(res.status != 200){
                    console.log(`An error occurred when posting. 
                                Statuscode: ${res.status},
                                message: ${res.statusText}`)
                } else{
                    res.json().then(data => {
                        try{
                            console.log(data["_id"])
                            idArray[i] = data["_id"]
                            i++
                        } catch(e){
                            console.log(`An error occured: ${e}`)
                        }
                    })
                }
            })
        }
        if(idArray.length > 0){
            res.json({usersCreated: idArray.length, arrayOfIds: idArray})
        } else {
            res.status(400).json({message: "An error occured during dataseeding, no users could be created. "
                                + "Check if the users already exist in your database and try again."})
        }
}