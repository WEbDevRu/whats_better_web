import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequest {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;
}

export interface ILoginRequest {
    email: string,
    password: string,
}