import { Inject, Injectable } from "@nestjs/common";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";
import localConfig from "./local-config";
import { ConfigType } from "@nestjs/config";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
    constructor(
        @Inject(localConfig.KEY) private readonly configService: ConfigType<typeof localConfig>
    ) { }
    createMongooseOptions(): MongooseModuleOptions {
        return {
            uri: this.configService.databaseUrl
        };
    }
}