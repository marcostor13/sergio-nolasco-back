import { IsNumber, IsNotEmpty, IsString, IsArray, ValidateNested, IsEnum, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateFinancialEntryDto {
  @IsNumber()
  @IsNotEmpty()
  netIncome: number;

  @IsNumber()
  @IsNotEmpty()
  debts: number;

  @IsNumber()
  @IsNotEmpty()
  netWorth: number;
}

export class CreateTimeAuditDto {
  @IsNumber()
  @IsNotEmpty()
  creationHours: number;

  @IsNumber()
  @IsNotEmpty()
  reactionHours: number;

  @IsNumber()
  @IsNotEmpty()
  consumptionHours: number;
}

export class CreateVitalityIndexDto {
  @IsNumber()
  @Min(1)
  @Max(10)
  @IsNotEmpty()
  rest: number;

  @IsNumber()
  @Min(1)
  @Max(10)
  @IsNotEmpty()
  food: number;

  @IsNumber()
  @Min(1)
  @Max(10)
  @IsNotEmpty()
  strength: number;
}

export class PersonDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  income: string;

  @IsString()
  @IsNotEmpty()
  problemType: string;

  @IsEnum(['creator', 'critic'])
  @IsNotEmpty()
  category: string;
}

export class CreateInfluenceCircleDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PersonDto)
  people: PersonDto[];
}

export class ExcuseEntryDto {
  @IsString()
  @IsNotEmpty()
  phrase: string;

  @IsString()
  @IsNotEmpty()
  command: string;
}

export class CreateExcusesLogDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExcuseEntryDto)
  excuses: ExcuseEntryDto[];
}

export class CreateBeliefBusterDto {
  @IsString()
  @IsNotEmpty()
  area: string;

  @IsString()
  @IsNotEmpty()
  limitingBelief: string;

  @IsString()
  @IsNotEmpty()
  evidence: string;
}

export class CreateParadigmDeclarationDto {
  @IsString()
  @IsNotEmpty()
  declaration: string;
}

export class CreateImpossibleMissionDto {
  @IsString()
  @IsNotEmpty()
  lifeMission: string;

  @IsString()
  @IsNotEmpty()
  impactMission: string;

  @IsString()
  @IsNotEmpty()
  abundanceMission: string;
}

export class CreateGoalCardDto {
  @IsString()
  @IsNotEmpty()
  goalText: string;
}

export class CreateWeeklyAuditDto {
  @IsString()
  @IsNotEmpty()
  review: string;

  @IsString()
  @IsNotEmpty()
  rethink: string;

  @IsString()
  @IsNotEmpty()
  rewrite: string;
}

export class CreateMasteryChallengeDto {
  @IsEnum(['decision', 'environment', 'praxis'])
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @Min(0)
  @Max(7)
  daysCompleted: number;
}
