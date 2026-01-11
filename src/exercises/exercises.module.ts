import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExercisesController } from './exercises.controller';
import { ExercisesService } from './exercises.service';
import { FinancialEntry, FinancialEntrySchema } from './schemas/financial.schema';
import { TimeAudit, TimeAuditSchema } from './schemas/time-audit.schema';
import { VitalityIndex, VitalityIndexSchema } from './schemas/vitality.schema';
import { InfluenceCircle, InfluenceCircleSchema } from './schemas/influence.schema';
import { ExcusesLog, ExcusesLogSchema } from './schemas/excuses.schema';
import { BeliefBuster, BeliefBusterSchema } from './schemas/belief.schema';
import { ParadigmDeclaration, ParadigmDeclarationSchema } from './schemas/paradigm.schema';
import { ImpossibleMission, ImpossibleMissionSchema } from './schemas/missions.schema';
import { GoalCard, GoalCardSchema } from './schemas/goal-card.schema';
import { WeeklyAudit, WeeklyAuditSchema } from './schemas/audit.schema';
import { MasteryChallenge, MasteryChallengeSchema } from './schemas/challenges.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FinancialEntry.name, schema: FinancialEntrySchema },
      { name: TimeAudit.name, schema: TimeAuditSchema },
      { name: VitalityIndex.name, schema: VitalityIndexSchema },
      { name: InfluenceCircle.name, schema: InfluenceCircleSchema },
      { name: ExcusesLog.name, schema: ExcusesLogSchema },
      { name: BeliefBuster.name, schema: BeliefBusterSchema },
      { name: ParadigmDeclaration.name, schema: ParadigmDeclarationSchema },
      { name: ImpossibleMission.name, schema: ImpossibleMissionSchema },
      { name: GoalCard.name, schema: GoalCardSchema },
      { name: WeeklyAudit.name, schema: WeeklyAuditSchema },
      { name: MasteryChallenge.name, schema: MasteryChallengeSchema },
    ]),
  ],
  controllers: [ExercisesController],
  providers: [ExercisesService],
  exports: [ExercisesService],
})
export class ExercisesModule {}
