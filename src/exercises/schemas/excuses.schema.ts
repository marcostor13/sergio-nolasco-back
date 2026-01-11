import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type ExcusesLogDocument = ExcusesLog & Document;

@Schema({ timestamps: true })
export class ExcuseEntry {
  @Prop({ required: true })
  phrase: string; // La excusa

  @Prop({ required: true })
  command: string; // El comando de acción inmediata
}

const ExcuseEntrySchema = SchemaFactory.createForClass(ExcuseEntry);

@Schema({ timestamps: true })
export class ExcusesLog {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: [ExcuseEntrySchema], required: true })
  excuses: ExcuseEntry[]; // Array de 3 excusas

  @Prop({ default: Date.now })
  date: Date;
}

export const ExcusesLogSchema = SchemaFactory.createForClass(ExcusesLog);
