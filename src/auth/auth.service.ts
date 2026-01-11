import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { EmailService } from '../email/email.service';
import { UserDocument } from '../users/schemas/user.schema';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new BadRequestException('El email ya está registrado');
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const user = await this.usersService.create(createUserDto);
    await this.usersService.setEmailVerificationToken(
      user.email,
      verificationToken,
    );

    await this.emailService.sendWelcomeEmail(user, verificationToken);

    const { password, ...userResult } = user.toObject();
    
    // Generar token para login automático
    const payload = { email: user.email, sub: user._id.toString() };
    const accessToken = this.jwtService.sign(payload);

    return {
      user: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isEmailVerified: user.isEmailVerified,
      },
      accessToken,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const isPasswordValid = await this.usersService.validatePassword(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Usuario inactivo');
    }

    const payload = { email: user.email, sub: user._id.toString() };
    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
      user: {
        id: user._id.toString(),
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isEmailVerified: user.isEmailVerified,
      },
    };
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    const user = await this.usersService.findByEmail(forgotPasswordDto.email);
    if (!user) {
      return { message: 'Si el email existe, recibirás un correo con instrucciones' };
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresIn = new Date();
    expiresIn.setHours(expiresIn.getHours() + 1);

    await this.usersService.updatePasswordResetToken(
      user.email,
      resetToken,
      expiresIn,
    );

    await this.emailService.sendPasswordResetEmail(user, resetToken);

    return {
      message: 'Si el email existe, recibirás un correo con instrucciones',
    };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.usersService.findByPasswordResetToken(
      resetPasswordDto.token,
    );

    if (!user) {
      throw new NotFoundException('Token de recuperación inválido');
    }

    if (
      !user.passwordResetExpires ||
      user.passwordResetExpires < new Date()
    ) {
      throw new BadRequestException('Token de recuperación expirado');
    }

    await this.usersService.updatePassword(
      user.email,
      resetPasswordDto.newPassword,
    );

    return { message: 'Contraseña actualizada correctamente' };
  }

  async verifyEmail(token: string) {
    const user = await this.usersService.verifyEmail(token);
    return { message: 'Email verificado correctamente' };
  }
}
