import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  Param,
} from '@nestjs/common';
import type { FastifyReply } from 'fastify';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private configService: ConfigService,
  ) {}

  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
    @Res() reply: FastifyReply,
  ) {
    const result = await this.authService.register(createUserDto);
    const isProduction = process.env.NODE_ENV === 'production';

    // Set cookie for auto-login after registration
    reply.setCookie('access_token', result.accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    reply.send(result);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res() reply: FastifyReply,
  ) {
    const result = await this.authService.login(loginDto);
    const isProduction = process.env.NODE_ENV === 'production';

    reply.setCookie('access_token', result.accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60, // Segundos
      path: '/',
    });

    reply.send(result);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res() reply: FastifyReply) {
    reply.clearCookie('access_token', { path: '/' });
    reply.send({ message: 'Sesión cerrada correctamente' });
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }

  @Post('verify-email/:token')
  @HttpCode(HttpStatus.OK)
  async verifyEmail(@Param('token') token: string) {
    return this.authService.verifyEmail(token);
  }
}
