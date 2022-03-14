
import { object, string, TypeOf } from 'zod'

export const createUserSessionSchema = object({
    body: object({
        password: string({
            required_error: "Password can not empty"
        }).min(6, "password to Shoets - password must be at least 6 characters"),

        email: string({
            required_error: "email can not empty"
        }).email("not a valid email"),

    })

});


