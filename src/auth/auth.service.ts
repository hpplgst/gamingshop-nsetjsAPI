import { BadRequestException, NotFoundException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LoginDto, RegisterDto } from './auth.dto';
import * as shortid from 'shortid'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { env } from 'process';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) { }

    async register(body: RegisterDto) {
        const { password, confirmPassword, email, name } = body
        const exist = await this.prisma.user.findUnique({
            where: { email }
        })
        if (exist) {
            throw new BadRequestException("this email has been registered")
        }
        if (password !== confirmPassword) {
            throw new BadRequestException("the password does not match")
        }
        const pass = await bcrypt.hash(password, 10)
        const user = await this.prisma.user.create({
            data: {
                id: shortid.generate(),
                name,
                email,
                password: pass
            }, select: {
                id: true, name: true, email: true
            }
        })
        return user;
    }


    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: { email }
        })

        if (!user) {
            throw new NotFoundException("this email does not exist")
        }
        if (!bcrypt.compare(password, user.password)) {
            throw new BadRequestException('password is wrong')
        }

        return user
    }

    async CreateJwt(user) {
        const { email, id, role } = user
        const token = await this.jwt.sign({
            id,
            email,
            role
        }, {
            secret: env.JWT_SECRET,
            expiresIn: "1d"
        })

        return {token}
    }
}
