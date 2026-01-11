import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type InfluenceAuditDocument = InfluenceAudit & Document;

@Schema()
export class PersonInfluence {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  income: number;

  @Prop({ required: true })
  problemType: string;

  @Prop({ required: true, enum: ['creator', 'critic'] })
  category: string;
}

export const PersonInfluenceSchema = SchemaFactory.createForClass(PersonInfluence);

@Schema({ timestamps: true })
export class InfluenceAudit {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ type: [PersonInfluenceSchema], required: true })
  people: PersonInfluence[];

  @Prop()
  averageIncome: number;

  @Prop()
  visionStatus: string; // 'Robada' o 'Potenciada'
}

export const InfluenceAuditSchema = SchemaFactory.createForClass(InfluenceAudit);
