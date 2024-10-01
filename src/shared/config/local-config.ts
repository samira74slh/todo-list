import { registerAs } from '@nestjs/config';
import { configDotenv } from 'dotenv';
configDotenv({ path: `${process.cwd()}/.env` });

export default registerAs('local', () => ({
  port: parseInt(process.env.PORT) || 3000,
  server: process.env.SERVER,
  origin: process.env.ORIGIN,
  databaseUrl: process.env.DATABASE_URL,
  jwtAccessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  jwtExpireIn: process.env.JWT_EXPIRE_IN
}));
