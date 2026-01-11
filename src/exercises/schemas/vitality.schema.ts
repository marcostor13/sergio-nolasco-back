import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type VitalityIndexDocument = VitalityIndex & Document;

@Schema({ timestamps: true })
export class VitalityIndex {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true, min: 1, max: 10 })
  rest: number;

  @Prop({ required: true, min: 1, max: 10 })
  food: number;

  @Prop({ required: true, min: 1, max: 10 })
  strength: number;

  @Prop({ default: Date.now })
  date: Date;
}

export const VitalityIndexSchema = SchemaFactory.createForClass(VitalityIndex);
