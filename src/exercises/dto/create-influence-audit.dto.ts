import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray, IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';

export class PersonInfluenceDto {
  @IsString()
  name: string;

  @IsNumber()
  income: number;

  @IsString()
  problemType: string;

  @IsEnum(['creator', 'critic'])
  category: string;
}

export class CreateInfluenceAuditDto {
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(5)
  @Type(() => PersonInfluenceDto)
  people: PersonInfluenceDto[];
}
