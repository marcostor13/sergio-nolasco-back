import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type GoalCardDocument = GoalCard & Document;

@Schema({ timestamps: true })
export class GoalCard {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true })
  goalText: string;

  @Prop({ default: false })
  isCompleted: boolean;

  @Prop({ default: Date.now })
  date: Date;
}

export const GoalCardSchema = SchemaFactory.createForClass(GoalCard);
