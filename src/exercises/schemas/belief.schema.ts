import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../../users/schemas/user.schema';

export type BeliefBusterDocument = BeliefBuster & Document;

@Schema({ timestamps: true })
export class BeliefBuster {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ required: true })
  area: string; // Área de la Rueda de la Vida seleccionada

  @Prop({ required: true })
  limitingBelief: string; // La creencia limitante

  @Prop({ required: true })
  evidence: string; // Prueba de Error (evidencia de éxito contrario)

  @Prop({ default: Date.now })
  date: Date;
}

export const BeliefBusterSchema = SchemaFactory.createForClass(BeliefBuster);
