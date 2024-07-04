import {IsString, IsEmail, IsEnum, IsNotEmpty} from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsEmail()
    email: string

    @IsEnum(["INTERN", "USER", "ADMIN"], {
        message: 'Wmagane jest jedno z typów'
    })
    role: "INTERN" | "USER" | "ADMIN"
}
