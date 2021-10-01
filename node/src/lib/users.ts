import Ajv, { JSONSchemaType } from 'ajv';
import { HttpError, ValidationError } from './errors';

export type User = {
    id: number,
    login: string,
    password: string,
    isDeleted: boolean,
    age: number
}

export type UserCollection = {
    [key: number]: User
}

export class UsersStorage {
    private readonly SUGGEST_LIMIT: number = 5;
    private collection: UserCollection;
    private ajvValidate;

    constructor() {
        const ajv = new Ajv({allErrors: true});

        const schema: JSONSchemaType<User> = {
            type: "object",
            properties: {
                id: {type: "integer"},
                login: {type: "string", minLength: 3, maxLength: 20},
                password: {type: "string", pattern: "^(?=.*[0-9])(?=.*[A-Za-z])[\\w]{6,15}$"},
                isDeleted: {type: "boolean"},
                age: {type: "number", maximum: 130, minimum: 4}
            },
            required: ["id", "login", "password", "isDeleted", "age"],
            additionalProperties: false
        }

        this.ajvValidate = ajv.compile(schema);
        this.collection = this.init();
    }

    init(): UserCollection {
        return {};
    }

    validate(userData: User): User {
        if (!this.ajvValidate(userData)) {
            throw new ValidationError(this.ajvValidate.errors);
        }

        let checkLogin = this.getAll(true).find((el: User) => el.login === userData.login);

        if (checkLogin && checkLogin.id != userData.id) {
            throw new HttpError(400, "User with this login already exists.");
        }

        return userData;
    }

    addUser(userData: User): number {
        const id = Object.keys(this.collection).length + 1;
        const user = Object.assign({id: id, isDeleted: false}, userData);
        this.collection[id] = this.validate(user);

        return id;
    }

    editUser(id: number, userData: User): void {
        if (!this.collection.hasOwnProperty(id)) {
            throw new HttpError(404, "User not found.");
        }

        let user = Object.assign({}, this.collection[id], userData);
        this.collection[id] = this.validate(user);
    }

    deleteUser(id: number): void {
        if (!this.collection.hasOwnProperty(id)) {
            throw new HttpError(404, "User not found.");
        }

        this.collection[id].isDeleted = true;
    }

    getUser(id: number): User {
        if (!this.collection.hasOwnProperty(id)) {
            throw new HttpError(404, "User not found.");
        }

        return this.collection[id];
    }

    getAll(withDeleted: boolean): User[] {
        let users = Object.values(this.collection);

        if (!withDeleted) {
            users = users.filter((user: any) => !user.isDeleted);
        }

        return users;
    }

    matchUser(part: string, limit?: number): User[] {
        let users = this.getAll(false)
            .filter(user => user.login.startsWith(part))
            .sort((u1, u2) => u1.login < u2.login ? -1 : (u1.login > u2.login ? 1 : 0));

        return users.slice(0, limit || this.SUGGEST_LIMIT);
    }
}
