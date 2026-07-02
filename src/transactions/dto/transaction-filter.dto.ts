import { PaginationDto } from '../../common/dto/pagination.dto';
import { IsEnum, IsOptional, IsDateString } from 'class-validator';
import {
  TransactionType,
  TransactionStatus,
} from '@prisma/client';

export class TransactionFilterDto extends PaginationDto {
  @IsOptional()
  @IsEnum(TransactionType)
  type?: TransactionType;

  @IsOptional()
  @IsEnum(TransactionStatus)
  status?: TransactionStatus;

  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;
}