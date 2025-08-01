import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty({ message: 'آیدی کاربر نمیتواند خالی باشد' })
  userId: number;

  @IsOptional()
  replyTo: number;

  @IsString({ message: 'عنوان باید یک رشته باشد' })
  @IsNotEmpty({ message: 'عنوان نمیتواند خالی باشد' })
  title: string;

  @IsString({ message: 'موضوع باید یک رشته باشد' })
  @IsNotEmpty({ message: 'موضوع نمیتواند خالی باشد' })
  subject: string;

  @IsString({ message: 'توضیحات باید یک رشته باشد' })
  @IsNotEmpty({ message: 'توضیحات نمیتواند خالی باشد' })
  description: string;
}
