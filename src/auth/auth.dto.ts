import { IsString ,IsEmail,Length,Matches} from 'class-validator'

export class RegisterDto {
    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsString()
    @Length(6,20)
    password: string

    @IsString()
    @Length(6,20)
    confirmPassword: string
}

export class LoginDto {
    @IsEmail()
    email: string

    @IsString()
    @Length(6,20)
    password: string
}