import { Controller, Get, Param, UseGuards ,Request} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from '../auth/roles/role.decorator';
import { RoleGuards } from 'src/auth/roles/role.guard';

@Roles('ADMIN')
@Controller('users')
export class UsersController {
    constructor(private service: UsersService) { }

    @Get()
    @UseGuards(JwtGuard,RoleGuards)
    async getUsers() {
        return this.service.getUsers()

    }
    
    @UseGuards(JwtGuard,RoleGuards)
    @Get('profile')
    @Roles('USER')
    async getUser(@Request() req) {
        return this.service.getUser(req.user.id)
    }

    @UseGuards(JwtGuard)
    @Get('cart')
    async cart(@Request() req){
       return await this.service.cart(req.user)
    }
}
