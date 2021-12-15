import { Role } from './../../enums/roles.enum';
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Logger } from '@nestjs/common';
import { throws } from 'assert';


@Injectable()
export class RoleGuard implements CanActivate {
    logger: Logger
    constructor(private reflector: Reflector) {
        this.logger = new Logger()
    }

    canActivate(context: ExecutionContext): boolean {
        //login goes inside here
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
            context.getHandler(),
            context.getClass(),
        ]);


        if (!requiredRoles) {
            return true;
        }
        
        const { user } = context.switchToHttp().getRequest();


        return requiredRoles.some((role) => user.roles?.includes(role));

    }
}

