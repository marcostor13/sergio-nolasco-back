import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateFinancialAuditDto {
  @IsNumber()
  @Min(0)
  monthlyIncome: number;

  @IsNumber()
  @Min(0)
  totalDebt: number;

  @IsNumber()
  netWorth: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
