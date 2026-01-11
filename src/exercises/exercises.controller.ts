import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
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
import { FastifyRequest } from 'fastify';

interface RequestWithUser extends FastifyRequest {
  user: {
    id: string;
    email: string;
  };
}

@Controller('exercises')
@UseGuards(JwtAuthGuard)
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  // Financial
  @Post('financial')
  async createFinancial(@Req() req: RequestWithUser, @Body() dto: CreateFinancialEntryDto) {
    return this.exercisesService.createFinancialEntry(req.user.id, dto);
  }

  @Get('financial/latest')
  async getLatestFinancial(@Req() req: RequestWithUser) {
    return this.exercisesService.getLatestFinancialEntry(req.user.id);
  }

  // Time Audit
  @Post('time')
  async createTime(@Req() req: RequestWithUser, @Body() dto: CreateTimeAuditDto) {
    return this.exercisesService.createTimeAudit(req.user.id, dto);
  }

  @Get('time/latest')
  async getLatestTime(@Req() req: RequestWithUser) {
    return this.exercisesService.getLatestTimeAudit(req.user.id);
  }

  // Vitality
  @Post('vitality')
  async createVitality(@Req() req: RequestWithUser, @Body() dto: CreateVitalityIndexDto) {
    return this.exercisesService.createVitalityIndex(req.user.id, dto);
  }

  @Get('vitality/latest')
  async getLatestVitality(@Req() req: RequestWithUser) {
    return this.exercisesService.getLatestVitalityIndex(req.user.id);
  }

  // Influence
  @Post('influence')
  async createInfluence(@Req() req: RequestWithUser, @Body() dto: CreateInfluenceCircleDto) {
    return this.exercisesService.createInfluenceCircle(req.user.id, dto);
  }

  @Get('influence/latest')
  async getLatestInfluence(@Req() req: RequestWithUser) {
    return this.exercisesService.getLatestInfluenceCircle(req.user.id);
  }

  // Excuses Log
  @Post('excuses')
  async createExcuses(@Req() req: RequestWithUser, @Body() dto: CreateExcusesLogDto) {
    return this.exercisesService.createExcusesLog(req.user.id, dto);
  }

  @Get('excuses/latest')
  async getLatestExcuses(@Req() req: RequestWithUser) {
    return this.exercisesService.getLatestExcusesLog(req.user.id);
  }

  // Belief Buster
  @Post('belief')
  async createBelief(@Req() req: RequestWithUser, @Body() dto: CreateBeliefBusterDto) {
    return this.exercisesService.createBeliefBuster(req.user.id, dto);
  }

  @Get('belief/latest')
  async getLatestBelief(@Req() req: RequestWithUser) {
    return this.exercisesService.getLatestBeliefBuster(req.user.id);
  }

  // Paradigm Declaration
  @Post('paradigm')
  async createParadigm(@Req() req: RequestWithUser, @Body() dto: CreateParadigmDeclarationDto) {
    return this.exercisesService.createParadigmDeclaration(req.user.id, dto);
  }

  @Get('paradigm/latest')
  async getLatestParadigm(@Req() req: RequestWithUser) {
    return this.exercisesService.getLatestParadigmDeclaration(req.user.id);
  }

  // Impossible Missions
  @Post('missions')
  async createMissions(@Req() req: RequestWithUser, @Body() dto: CreateImpossibleMissionDto) {
    return this.exercisesService.createImpossibleMission(req.user.id, dto);
  }

  @Get('missions/latest')
  async getLatestMissions(@Req() req: RequestWithUser) {
    return this.exercisesService.getLatestImpossibleMission(req.user.id);
  }

  // Goal Card
  @Post('goal-card')
  async createGoalCard(@Req() req: RequestWithUser, @Body() dto: CreateGoalCardDto) {
    return this.exercisesService.createGoalCard(req.user.id, dto);
  }

  @Get('goal-card/latest')
  async getLatestGoalCard(@Req() req: RequestWithUser) {
    return this.exercisesService.getLatestGoalCard(req.user.id);
  }

  // Weekly Audit
  @Post('audit')
  async createAudit(@Req() req: RequestWithUser, @Body() dto: CreateWeeklyAuditDto) {
    return this.exercisesService.createWeeklyAudit(req.user.id, dto);
  }

  @Get('audit/latest')
  async getLatestAudit(@Req() req: RequestWithUser) {
    return this.exercisesService.getLatestWeeklyAudit(req.user.id);
  }

  // Mastery Challenges
  @Post('challenges')
  async updateChallenge(@Req() req: RequestWithUser, @Body() dto: CreateMasteryChallengeDto) {
    return this.exercisesService.updateMasteryChallenge(req.user.id, dto);
  }

  @Get('challenges')
  async getChallenges(@Req() req: RequestWithUser) {
    return this.exercisesService.getMasteryChallenges(req.user.id);
  }
}
