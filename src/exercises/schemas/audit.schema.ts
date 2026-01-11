import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type WeeklyAuditDocument = WeeklyAudit & Document;

@Schema({ timestamps: true })
export class WeeklyAudit {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true })
  review: string; // Revisar

  @Prop({ required: true })
  rethink: string; // Re-pensar

  @Prop({ required: true })
  rewrite: string; // Re-escribir

  @Prop({ default: Date.now })
  date: Date;
}

export const WeeklyAuditSchema = SchemaFactory.createForClass(WeeklyAudit);
