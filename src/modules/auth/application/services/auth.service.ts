import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { IJWTPayload } from "../../domain/repositories/jwt-payload.interface";
import { Password } from "../../../user/domain/value-objects/password.vo";
import { User } from "../../../user/infrastructure/database/user.schema";
import { IJWtValidate } from "../../domain/repositories/jwt-validate.interface";
import { UserService } from '../../../user/application/services/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(forwardRef(() => UserService))
        private readonly userService: UserService,
    ) { }

    async getAccessToken(payload: IJWTPayload): Promise<string> {
        try {
            return await this.jwtService.signAsync(payload);
        } catch (error) {
            throw new Error(error);
        }
    }

    async validate(data: IJWtValidate): Promise<User> {
        const { password, username } = data;
        let user = await this.userService.getUserByFilter({ username: username });
        if (!user) {
            throw new HttpException(
                'invalid username,user not found',
                HttpStatus.NOT_FOUND
            );
        } else {
            const pass = new Password(password);
            if (await pass.compare(user.password)) {
                return user;
            } else {
                throw new HttpException(
                    'invalid password',
                    HttpStatus.BAD_REQUEST
                )
            }
        }

    }
}