import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";


@Injectable()
export class RoleGuards implements CanActivate {
    constructor(private reflector: Reflector) {

    }
    canActivate(context: ExecutionContext) {
        const { user } = context.switchToHttp().getRequest()
        const methodRoles = this.reflector.get("Roles", context.getHandler()) ? this.reflector.get("Roles", context.getHandler()) : []
        const controllerRoles = this.reflector.get("Roles", context.getClass()) ?  this.reflector.get("Roles", context.getClass()) : []
        console.log(user)
        const roles = [...methodRoles, ...controllerRoles]
        return roles.some(r =>  r === user.role )
    }
}