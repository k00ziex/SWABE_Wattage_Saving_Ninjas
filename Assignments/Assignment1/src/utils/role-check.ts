import { Request } from "express";

export const isClerk = (req:Request) => {
    var role:string = getRole(req);
    return isRole(role, "Clerk");
};

export const isManager = (req:Request) => {
    var role:string = getRole(req);
    return isRole(role, "Manager");
};

export const isGuest = (req:Request) => {
    var role:string = getRole(req);
    return isRole(role, "Guest");
};

function isRole(inputRole:string, roleType:string){
    if(inputRole != null){
        return inputRole.toLowerCase() == roleType.toLowerCase();
    }
    return false;
}

export const getRole = (req: Request) =>{
    if(req != null && req.body != null){
        return req.body.rights;
    } else{
        return null;
    }
};