import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FinancialEntry, FinancialEntryDocument } from './schemas/financial.schema';
import { TimeAudit, TimeAuditDocument } from './schemas/time-audit.schema';
import { VitalityIndex, VitalityIndexDocument } from './schemas/vitality.schema';
import { InfluenceCircle, InfluenceCircleDocument } from './schemas/influence.schema';
import { ExcusesLog, ExcusesLogDocument } from './schemas/excuses.schema';
import { BeliefBuster, BeliefBusterDocument } from './schemas/belief.schema';
import { ParadigmDeclaration, ParadigmDeclarationDocument } from './schemas/paradigm.schema';
import { ImpossibleMission, ImpossibleMissionDocument } from './schemas/missions.schema';
import { GoalCard, GoalCardDocument } from './schemas/goal-card.schema';
import { WeeklyAudit, WeeklyAuditDocument } from './schemas/audit.schema';
import { MasteryChallenge, MasteryChallengeDocument } from './schemas/challenges.schema';
import {
  CreateFinancialEntryDto,
  CreateTimeAuditDto,
  CreateVitalityIndexDto,
  CreateInfluenceCircleDto,
  CreateExcusesLogDto,
  CreateBeliefBusterDto,
  CreateParadigmDeclarationDto,
  CreateImpossibleMissionDto,
  CreateGoalCardDto,
  CreateWeeklyAuditDto,
  CreateMasteryChallengeDto,
} from './dto/create-exercises.dto';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectModel(FinancialEntry.name) private financialModel: Model<FinancialEntryDocument>,
    @InjectModel(TimeAudit.name) private timeModel: Model<TimeAuditDocument>,
    @InjectModel(VitalityIndex.name) private vitalityModel: Model<VitalityIndexDocument>,
    @InjectModel(InfluenceCircle.name) private influenceModel: Model<InfluenceCircleDocument>,
    @InjectModel(ExcusesLog.name) private excusesModel: Model<ExcusesLogDocument>,
    @InjectModel(BeliefBuster.name) private beliefModel: Model<BeliefBusterDocument>,
    @InjectModel(ParadigmDeclaration.name) private paradigmModel: Model<ParadigmDeclarationDocument>,
    @InjectModel(ImpossibleMission.name) private missionModel: Model<ImpossibleMissionDocument>,
    @InjectModel(GoalCard.name) private goalModel: Model<GoalCardDocument>,
    @InjectModel(WeeklyAudit.name) private auditModel: Model<WeeklyAuditDocument>,
    @InjectModel(MasteryChallenge.name) private challengeModel: Model<MasteryChallengeDocument>,
  ) {}

  // Financial
  async createFinancialEntry(userId: string, dto: CreateFinancialEntryDto) {
    const entry = new this.financialModel({ ...dto, user: userId });
    return entry.save();
  }

  async getLatestFinancialEntry(userId: string) {
    return this.financialModel.findOne({ user: userId }).sort({ createdAt: -1 }).exec();
  }

  // Time Audit
  async createTimeAudit(userId: string, dto: CreateTimeAuditDto) {
    const total = dto.creationHours + dto.reactionHours + dto.consumptionHours;
    if (total !== 168) {
      throw new BadRequestException('El total de horas debe ser exactamente 168.');
    }
    const entry = new this.timeModel({ ...dto, totalHours: total, user: userId });
    return entry.save();
  }

  async getLatestTimeAudit(userId: string) {
    return this.timeModel.findOne({ user: userId }).sort({ createdAt: -1 }).exec();
  }

  // Vitality
  async createVitalityIndex(userId: string, dto: CreateVitalityIndexDto) {
    const entry = new this.vitalityModel({ ...dto, user: userId });
    return entry.save();
  }

  async getLatestVitalityIndex(userId: string) {
    return this.vitalityModel.findOne({ user: userId }).sort({ createdAt: -1 }).exec();
  }

  // Influence
  async createInfluenceCircle(userId: string, dto: CreateInfluenceCircleDto) {
    if (dto.people.length !== 5) {
      throw new BadRequestException('Debes registrar exactamente 5 personas.');
    }
    
    // Simple logic: if more than 2 are critics, impact is negative.
    const critics = dto.people.filter(p => p.category === 'critic').length;
    const impact = critics > 2 ? 'Negative' : 'Positive';

    const entry = new this.influenceModel({ ...dto, averageImpact: impact, user: userId });
    return entry.save();
  }

  async getLatestInfluenceCircle(userId: string) {
    return this.influenceModel.findOne({ user: userId }).sort({ createdAt: -1 }).exec();
  }

  // Excuses Log
  async createExcusesLog(userId: string, dto: CreateExcusesLogDto) {
    if (dto.excuses.length !== 3) {
      throw new BadRequestException('Debes registrar exactamente 3 excusas.');
    }
    const entry = new this.excusesModel({ ...dto, user: userId });
    return entry.save();
  }

  async getLatestExcusesLog(userId: string) {
    return this.excusesModel.findOne({ user: userId }).sort({ createdAt: -1 }).exec();
  }

  // Belief Buster
  async createBeliefBuster(userId: string, dto: CreateBeliefBusterDto) {
    const entry = new this.beliefModel({ ...dto, user: userId });
    return entry.save();
  }

  async getLatestBeliefBuster(userId: string) {
    return this.beliefModel.findOne({ user: userId }).sort({ createdAt: -1 }).exec();
  }

  // Paradigm Declaration
  async createParadigmDeclaration(userId: string, dto: CreateParadigmDeclarationDto) {
    const entry = new this.paradigmModel({ ...dto, user: userId });
    return entry.save();
  }

  async getLatestParadigmDeclaration(userId: string) {
    return this.paradigmModel.findOne({ user: userId }).sort({ createdAt: -1 }).exec();
  }

  // Impossible Missions
  async createImpossibleMission(userId: string, dto: CreateImpossibleMissionDto) {
    // Validate format
    if (!dto.lifeMission.startsWith('Me siento feliz y agradecido ahora que')) {
      throw new BadRequestException('Las misiones deben empezar con "Me siento feliz y agradecido ahora que..."');
    }
    const entry = new this.missionModel({ ...dto, user: userId });
    return entry.save();
  }

  async getLatestImpossibleMission(userId: string) {
    return this.missionModel.findOne({ user: userId }).sort({ createdAt: -1 }).exec();
  }

  // Goal Card
  async createGoalCard(userId: string, dto: CreateGoalCardDto) {
    const entry = new this.goalModel({ ...dto, user: userId });
    return entry.save();
  }

  async getLatestGoalCard(userId: string) {
    return this.goalModel.findOne({ user: userId }).sort({ createdAt: -1 }).exec();
  }

  // Weekly Audit
  async createWeeklyAudit(userId: string, dto: CreateWeeklyAuditDto) {
    const entry = new this.auditModel({ ...dto, user: userId });
    return entry.save();
  }

  async getLatestWeeklyAudit(userId: string) {
    return this.auditModel.findOne({ user: userId }).sort({ createdAt: -1 }).exec();
  }

  // Mastery Challenges
  async updateMasteryChallenge(userId: string, dto: CreateMasteryChallengeDto) {
    const isCompleted = dto.daysCompleted >= 7;
    return this.challengeModel.findOneAndUpdate(
      { user: userId, type: dto.type },
      { ...dto, isCompleted, user: userId },
      { new: true, upsert: true }
    ).exec();
  }

  async getMasteryChallenges(userId: string) {
    return this.challengeModel.find({ user: userId }).exec();
  }

  // Global Progress
  async getOverallProgress(userId: string) {
    const [
      financial,
      time,
      vitality,
      influence,
      excuses,
      belief,
      paradigm,
      missions,
      goal,
      audit,
      challenges,
    ] = await Promise.all([
      this.financialModel.exists({ user: userId }),
      this.timeModel.exists({ user: userId }),
      this.vitalityModel.exists({ user: userId }),
      this.influenceModel.exists({ user: userId }),
      this.excusesModel.exists({ user: userId }),
      this.beliefModel.exists({ user: userId }),
      this.paradigmModel.exists({ user: userId }),
      this.missionModel.exists({ user: userId }),
      this.goalModel.exists({ user: userId }),
      this.auditModel.exists({ user: userId }),
      this.challengeModel.exists({ user: userId }),
    ]);

    const totalSteps = 11;
    let completedSteps = 0;

    if (financial) completedSteps++;
    if (time) completedSteps++;
    if (vitality) completedSteps++;
    if (influence) completedSteps++;
    if (excuses) completedSteps++;
    if (belief) completedSteps++;
    if (paradigm) completedSteps++;
    if (missions) completedSteps++;
    if (goal) completedSteps++;
    if (audit) completedSteps++;
    if (challenges) completedSteps++;

    const percentage = Math.round((completedSteps / totalSteps) * 100);

    return {
      percentage,
      details: {
        financial: !!financial,
        time: !!time,
        vitality: !!vitality,
        influence: !!influence,
        excuses: !!excuses,
        belief: !!belief,
        paradigm: !!paradigm,
        missions: !!missions,
        goal: !!goal,
        audit: !!audit,
        challenges: !!challenges,
      },
    };
  }
}
