import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type MasteryChallengeDocument = MasteryChallenge & Document;

@Schema({ timestamps: true })
export class MasteryChallenge {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true, enum: ['decision', 'environment', 'praxis'] })
  type: string;

  @Prop({ default: 0 })
  daysCompleted: number; // 0-7

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ default: Date.now })
  startDate: Date;
}

export const MasteryChallengeSchema =
  SchemaFactory.createForClass(MasteryChallenge);
