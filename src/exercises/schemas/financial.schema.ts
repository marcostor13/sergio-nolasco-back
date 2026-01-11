import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type FinancialEntryDocument = FinancialEntry & Document;

@Schema({ timestamps: true })
export class FinancialEntry {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true })
  netIncome: number;

  @Prop({ required: true })
  debts: number;

  @Prop({ required: true })
  netWorth: number;

  @Prop({ default: Date.now })
  date: Date;
}

export const FinancialEntrySchema =
  SchemaFactory.createForClass(FinancialEntry);
