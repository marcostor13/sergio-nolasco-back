import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type TimeAuditDocument = TimeAudit & Document;

@Schema({ timestamps: true })
export class TimeAudit {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true })
  creationHours: number;

  @Prop({ required: true })
  reactionHours: number;

  @Prop({ required: true })
  consumptionHours: number;

  @Prop({ required: true })
  totalHours: number; // Validation enforced in DTO/Service (should be 168)

  @Prop({ default: Date.now })
  date: Date;
}

export const TimeAuditSchema = SchemaFactory.createForClass(TimeAudit);
