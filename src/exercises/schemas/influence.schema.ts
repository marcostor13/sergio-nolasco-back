import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type InfluenceCircleDocument = InfluenceCircle & Document;

@Schema({ timestamps: true })
export class Person {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  income: string; // Range or approx value

  @Prop({ required: true })
  problemType: string;

  @Prop({ required: true, enum: ['creator', 'critic'] })
  category: string;
}

const PersonSchema = SchemaFactory.createForClass(Person);

@Schema({ timestamps: true })
export class InfluenceCircle {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: [PersonSchema], required: true })
  people: Person[];

  @Prop({ required: true })
  averageImpact: string; // Calculated field: 'Positive' or 'Negative'

  @Prop({ default: Date.now })
  date: Date;
}

export const InfluenceCircleSchema =
  SchemaFactory.createForClass(InfluenceCircle);
