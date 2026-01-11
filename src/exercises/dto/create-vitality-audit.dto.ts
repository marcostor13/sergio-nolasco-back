import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateVitalityAuditDto {
  @IsNumber()
  @Min(1)
  @Max(10)
  restLevel: number;

  @IsNumber()
  @Min(1)
  @Max(10)
  foodQuality: number;

  @IsNumber()
  @Min(1)
  @Max(10)
  physicalStrength: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
