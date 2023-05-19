import { IsString, IsIn, IsInt, IsNotEmpty, isNotEmpty } from 'class-validator'

export class AddProductDto {
    @IsIn(["MouseAndKeyboard", "Cpu", "Gpu", "MotherBoard", "Case"])
    group: any

    @IsString()
    title: string

    
    image: any

    description?: string

    @IsInt()
    price: number

    @IsInt()
    count: number
}

export class UppdateProductDto {
    @IsIn(["MouseAndKeyboard", "Cpu", "Gpu", "MotherBoard", "Case"])
    group: any

    @IsString()
    title: string

    description?: string

    @IsInt()
    price: number

    @IsInt()
    count: number
}
