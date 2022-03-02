import { Request } from "express";
import { decode, verify, JwtPayload, Jwt} from 'jsonwebtoken'

export const getRoleFromJwt = (req:Request) => {
    let token = req.headers["authorization"]
    if(token){
        let bearer = token.split(" ");
        let bearerToken = bearer[1]
        let decoded = decode(bearerToken, {complete: true})
        let payload = decoded?.payload as JwtPayload
        return payload["email"]
    }
};