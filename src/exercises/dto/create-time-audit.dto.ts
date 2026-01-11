import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateTimeAuditDto {
  @IsNumber()
  @Min(0)
  @Max(168)
  creationHours: number;

  @IsNumber()
  @Min(0)
  @Max(168)
  reactionHours: number;

  @IsNumber()
  @Min(0)
  @Max(168)
  consumptionHours: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
