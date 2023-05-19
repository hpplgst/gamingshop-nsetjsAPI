import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from '../auth.service'
import { Injectable} from '@nestjs/common'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private service : AuthService) {
        super({
            usernameField: 'email'
        })
    }
   async validate(email: string, password: string) {
        const user = await this.service.login(email , password)
        return user
    }
}