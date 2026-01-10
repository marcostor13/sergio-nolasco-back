import { databaseConfig } from './database.config';
import { emailConfig } from './email.config';
import { jwtConfig } from './jwt.config';

export const appConfig = () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  ...databaseConfig(),
  ...jwtConfig(),
  ...emailConfig(),
});
