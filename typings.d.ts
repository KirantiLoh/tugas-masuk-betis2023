interface ILoginPayload  {
    email: string
    password: string
}

interface IUser {
    pk: number
    username: string
    email: string
    first_name: string
    last_name: string
}

interface IToken {
    access_token: string
    refresh_token: string
}

interface IAuthResponse extends IToken {
    user: IUser
}

interface IBread {
    id: number
    name: string
    expired_date: string
    description: string
    image: string
    owner: number
}

interface IGetRotiResponse {
    status: number
    message: string
    username: string
    data: IBread[] | []
}