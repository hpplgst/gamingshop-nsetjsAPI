import { Controller, Post,Body, UseGuards,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './auth.dto';
import { LocalGuard } from './passport/local.guard';

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService) { }

    @Post('register')
  register(@Body() body : RegisterDto) {
        return this.service.register(body)
    }

    @Post('login')
    @UseGuards(LocalGuard)
    async  login(@Body() body:LoginDto,@Request() req){
       const jwt = await this.service.CreateJwt(req.user)
       return jwt;
    }
}
