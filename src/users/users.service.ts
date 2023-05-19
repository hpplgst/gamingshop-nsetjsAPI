import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async getUsers() {
        const users = await this.prisma.user.findMany()

        return users;
    }

    async getUser(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        })
        if (!user) throw new NotFoundException("user not found")
        return user;
    }

    async cart(user: any) {
       const cart = await this.prisma.user.findUnique({ where: { id: user.id } ,select:{products:true}})
       if(!cart){
        return "Havnt product"
       }
       return cart
    }
}
