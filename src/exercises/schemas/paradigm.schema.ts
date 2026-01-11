import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type ParadigmDeclarationDocument = ParadigmDeclaration & Document;

@Schema({ timestamps: true })
export class ParadigmDeclaration {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true })
  declaration: string; // El nuevo modelo de mundo (párrafo)

  @Prop({ default: Date.now })
  date: Date;
}

export const ParadigmDeclarationSchema =
  SchemaFactory.createForClass(ParadigmDeclaration);
