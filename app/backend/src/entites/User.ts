export interface Iuser{
    id?: number
    username: string
    role: string
    email: string
    password: string
}

export class User implements Iuser {
    public id?: number

    public username: string
    public role: string
    public email: string
    public password: string

    constructor(user: Omit<User, 'id'>){
        Object.assign(this, user);
    }

    checkUser(user: Iuser) {
       const {email} = user
       
    }
}