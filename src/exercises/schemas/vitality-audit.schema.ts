import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type VitalityAuditDocument = VitalityAudit & Document;

@Schema({ timestamps: true })
export class VitalityAudit {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, min: 1, max: 10 })
  restLevel: number;

  @Prop({ required: true, min: 1, max: 10 })
  foodQuality: number;

  @Prop({ required: true, min: 1, max: 10 })
  physicalStrength: number;

  @Prop()
  notes: string;
}

export const VitalityAuditSchema = SchemaFactory.createForClass(VitalityAudit);
