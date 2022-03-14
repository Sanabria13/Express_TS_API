
import { object, string, TypeOf } from 'zod'


export const createUserSchema = object({
    body: object({
        name: string({
            required_error: "Name can not empty"
        }),
        password: string({
            required_error: "Password can not empty"
        }).min(6, "password to Shoets - password must be at least 6 characters"),
        passwordConfirmation: string({
            required_error: "PasswordConfirmation can not empty"
        }),
        email: string({
            required_error: "email can not empty"
        }).email("not a valid email"),

    }).refine((data) => data.password === data.passwordConfirmation
        , { message: "passwords do not match", path: ["passwordConfirmation"] })
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>
    , "body.passwordConfirmation">;
