import { IsString, IsIn, IsInt, IsNotEmpty, isNotEmpty } from 'class-validator'

export class AddProductDto {
    @IsIn(["MouseAndKeyboard", "Cpu", "Gpu", "MotherBoard", "Case"])
    group: any

    @IsNotEmpty()
    title: string

    
    image: any

    description?: string

    @IsNotEmpty()
    price: number

    @IsNotEmpty()
    count: number
}

export class UppdateProductDto {
    @IsIn(["MouseAndKeyboard", "Cpu", "Gpu", "MotherBoard", "Case"])
    group: any

    @IsNotEmpty()
    title: string

    description?: string

    @IsNotEmpty()
    price: number

    @IsNotEmpty()
    count: number
}