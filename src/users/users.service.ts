import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return user.save();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email: email.toLowerCase() }).exec();
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async updatePasswordResetToken(
    email: string,
    token: string,
    expiresIn: Date,
  ): Promise<void> {
    await this.userModel
      .updateOne(
        { email: email.toLowerCase() },
        {
          passwordResetToken: token,
          passwordResetExpires: expiresIn,
        },
      )
      .exec();
  }

  async updatePassword(
    email: string,
    newPassword: string,
  ): Promise<UserDocument> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await this.userModel
      .findOneAndUpdate(
        { email: email.toLowerCase() },
        {
          password: hashedPassword,
          passwordResetToken: undefined,
          passwordResetExpires: undefined,
        },
        { new: true },
      )
      .exec();

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  async verifyEmail(token: string): Promise<UserDocument> {
    const user = await this.userModel
      .findOneAndUpdate(
        { emailVerificationToken: token },
        {
          isEmailVerified: true,
          emailVerificationToken: undefined,
        },
        { new: true },
      )
      .exec();

    if (!user) {
      throw new NotFoundException('Token de verificación inválido');
    }

    return user;
  }

  async setEmailVerificationToken(
    email: string,
    token: string,
  ): Promise<void> {
    await this.userModel
      .updateOne(
        { email: email.toLowerCase() },
        { emailVerificationToken: token },
      )
      .exec();
  }

  async findByPasswordResetToken(
    token: string,
  ): Promise<UserDocument | null> {
    return this.userModel
      .findOne({ passwordResetToken: token })
      .exec();
  }

  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
