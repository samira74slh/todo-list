import { Injectable } from "@nestjs/common";
import { ThrottlerModuleOptions, ThrottlerOptionsFactory } from "@nestjs/throttler";

@Injectable()
export class ThrottlerConfigService implements ThrottlerOptionsFactory {
    createThrottlerOptions(): Promise<ThrottlerModuleOptions> | ThrottlerModuleOptions {
        return [{
            ttl: 600000,//10 min
            limit: 150,
        }]
    }

}
