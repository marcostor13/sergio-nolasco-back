import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('email.host'),
      port: this.configService.get<number>('email.port'),
      secure: this.configService.get<boolean>('email.secure'),
      auth: {
        user: this.configService.get<string>('email.auth.user'),
        pass: this.configService.get<string>('email.auth.pass'),
      },
    });
  }

  async sendWelcomeEmail(user: UserDocument, verificationToken: string) {
    const verificationUrl = `${this.configService.get<string>(
      'FRONTEND_URL',
    ) || 'http://localhost:4321'}/verify-email?token=${verificationToken}`;

    const html = this.getWelcomeEmailTemplate(
      user.firstName,
      verificationUrl,
    );

    await this.transporter.sendMail({
      from: this.configService.get<string>('email.from'),
      to: user.email,
      subject: 'Bienvenido a Sergio Nolasco - Formando Empresarios con Propósito',
      html,
    });
  }

  async sendPasswordResetEmail(user: UserDocument, resetToken: string) {
    const resetUrl = `${this.configService.get<string>(
      'FRONTEND_URL',
    ) || 'http://localhost:4321'}/reset-password?token=${resetToken}`;

    const html = this.getPasswordResetEmailTemplate(
      user.firstName,
      resetUrl,
    );

    await this.transporter.sendMail({
      from: this.configService.get<string>('email.from'),
      to: user.email,
      subject: 'Recuperación de Contraseña - Sergio Nolasco',
      html,
    });
  }

  private getWelcomeEmailTemplate(
    firstName: string,
    verificationUrl: string,
  ): string {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenido a Sergio Nolasco</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F8FAFC; color: #0F172A;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 16px; overflow: hidden; shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <h1 style="color: #70BE46; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">
                Sergio Nolasco
              </h1>
              <p style="color: #64748B; margin: 10px 0 0; font-size: 16px; font-weight: 500;">
                Formando Empresarios con Propósito
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 40px;">
              <h2 style="color: #0F172A; margin: 0 0 20px; font-size: 24px; font-weight: 700;">
                ¡Bienvenido, ${firstName}!
              </h2>
              <p style="color: #475569; margin: 0 0 20px; font-size: 16px; line-height: 1.6;">
                Estamos emocionados de tenerte como parte de nuestra comunidad. 
                Has dado el primer paso para transformar tu visión empresarial en realidad.
              </p>
              <p style="color: #475569; margin: 0 0 30px; font-size: 16px; line-height: 1.6;">
                Para comenzar tu viaje, necesitamos verificar tu dirección de correo electrónico. 
                Haz clic en el botón de abajo para activar tu cuenta.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${verificationUrl}" 
                       style="display: inline-block; padding: 16px 40px; background-color: #70BE46; color: #FFFFFF; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; letter-spacing: 0.5px;">
                      Verificar Mi Cuenta
                    </a>
                  </td>
                </tr>
              </table>
              <p style="color: #94A3B8; margin: 30px 0 0; font-size: 14px; line-height: 1.6;">
                Si el botón no funciona, copia y pega este enlace en tu navegador:<br>
                <a href="${verificationUrl}" style="color: #70BE46; word-break: break-all;">${verificationUrl}</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 40px; background-color: #F1F5F9; text-align: center;">
              <p style="color: #64748B; margin: 0; font-size: 14px; font-weight: 500;">
                &copy; ${new Date().getFullYear()} Sergio Nolasco. Todos los derechos reservados.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
  }

  private getPasswordResetEmailTemplate(
    firstName: string,
    resetUrl: string,
  ): string {
    return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recuperación de Contraseña</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #F8FAFC; color: #0F172A;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #F8FAFC; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #FFFFFF; border-radius: 16px; overflow: hidden; shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <h1 style="color: #70BE46; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">
                Sergio Nolasco
              </h1>
              <p style="color: #64748B; margin: 10px 0 0; font-size: 16px; font-weight: 500;">
                Formando Empresarios con Propósito
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 40px;">
              <h2 style="color: #0F172A; margin: 0 0 20px; font-size: 24px; font-weight: 700;">
                Hola, ${firstName}
              </h2>
              <p style="color: #475569; margin: 0 0 20px; font-size: 16px; line-height: 1.6;">
                Recibimos una solicitud para restablecer tu contraseña. 
                Si fuiste tú, haz clic en el botón de abajo para crear una nueva contraseña.
              </p>
              <p style="color: #475569; margin: 0 0 30px; font-size: 16px; line-height: 1.6;">
                Este enlace expirará en 1 hora por seguridad.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding: 20px 0;">
                    <a href="${resetUrl}" 
                       style="display: inline-block; padding: 16px 40px; background-color: #70BE46; color: #FFFFFF; text-decoration: none; border-radius: 12px; font-weight: 700; font-size: 16px; letter-spacing: 0.5px;">
                      Restablecer Contraseña
                    </a>
                  </td>
                </tr>
              </table>
              <p style="color: #94A3B8; margin: 30px 0 0; font-size: 14px; line-height: 1.6;">
                Si no solicitaste este cambio, ignora este correo y tu contraseña permanecerá igual.<br><br>
                Si el botón no funciona, copia y pega este enlace en tu navegador:<br>
                <a href="${resetUrl}" style="color: #70BE46; word-break: break-all;">${resetUrl}</a>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px 40px; background-color: #F1F5F9; text-align: center;">
              <p style="color: #64748B; margin: 0; font-size: 14px; font-weight: 500;">
                &copy; ${new Date().getFullYear()} Sergio Nolasco. Todos los derechos reservados.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
  }
}
