import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FinancialAuditDocument = FinancialAudit & Document;

@Schema({ timestamps: true })
export class FinancialAudit {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  monthlyIncome: number;

  @Prop({ required: true })
  totalDebt: number;

  @Prop({ required: true })
  netWorth: number;

  @Prop()
  notes: string;
}

export const FinancialAuditSchema = SchemaFactory.createForClass(FinancialAudit);
