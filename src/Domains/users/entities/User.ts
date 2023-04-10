import {UserGender} from '../enums/UserGender'

interface UserInterface {
    _id?: string;
    id: bigint;
    firstName: string;
    lastName?: string;
    username?: string;
    gender?: UserGender;
    age?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

class User implements UserInterface {
    _id?: string;
    id: bigint;
    firstName: string;
    lastName?: string;
    username?: string;
    gender?: UserGender;
    age?: number;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(userData: UserInterface) {
        this._id = userData._id
        this.id = userData.id
        this.firstName = userData.firstName
        this.lastName = userData.lastName
        this.username = userData.username
        this.gender = userData.gender
        this.age = userData.age
        this.createdAt = userData.createdAt
        this.updatedAt = userData.updatedAt
    }
}

export {UserInterface, User}
