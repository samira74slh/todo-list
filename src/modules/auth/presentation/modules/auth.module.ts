import { forwardRef, Module } from "@nestjs/common";
import { ConfigModule, ConfigType } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import localConfig from "../../../../shared/config/local-config";
import { AuthService } from "../../application/services/auth.service";
import { JwtStrategy } from "../../infrastructure/strategy/jwt.strategy";
import { LocalStrategy } from "../../infrastructure/strategy/local.strategy";
import { UserModule } from '../../../user/presentation/modules/user.module';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigType<typeof localConfig>) => {
                return {
                    secret: configService.jwtAccessTokenSecret,
                    signOptions: { expiresIn: '30d' },
                };
            },
            inject: [localConfig.KEY]
        }),
        forwardRef(() => UserModule)
    ],
    providers: [
        AuthService,
        JwtStrategy,
        LocalStrategy,
    ],
    exports: [AuthService]
})
export class AuthModule { }