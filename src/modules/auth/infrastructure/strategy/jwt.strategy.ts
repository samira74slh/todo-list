import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import localConfig from "../../../../shared/config/local-config";
import { IJWTPayload } from "../../domain/repositories/jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject(localConfig.KEY) private readonly configService: ConfigType<typeof localConfig>,
    ) {
        super({
            secretOrKey: configService.jwtAccessTokenSecret,
            ignoreExpiration: false,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }
    async validate(payload: IJWTPayload): Promise<any> {
        return payload;
    }
}
