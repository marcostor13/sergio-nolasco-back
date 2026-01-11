import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type ImpossibleMissionDocument = ImpossibleMission & Document;

@Schema({ timestamps: true })
export class ImpossibleMission {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true })
  lifeMission: string;

  @Prop({ required: true })
  impactMission: string;

  @Prop({ required: true })
  abundanceMission: string;

  @Prop({ default: Date.now })
  date: Date;
}

export const ImpossibleMissionSchema =
  SchemaFactory.createForClass(ImpossibleMission);
