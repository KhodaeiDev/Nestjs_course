import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateAddressDto {
  @IsString({ message: 'استان باید یک رشته باشد' })
  @IsNotEmpty({ message: 'استان نمیتواند خالی باشد' })
  province: string;

  @IsString({ message: 'شهر باید یک رشته باشد' })
  @IsNotEmpty({ message: 'شهر نمیتواند خالی باشد' })
  city: string;

  @IsString({ message: 'آدرس باید یک رشته باشد' })
  @IsNotEmpty({ message: 'آدرس نمیتواند خالی باشد' })
  address: string;

  @IsString({ message: 'کد پستی باید یک رشته باشد' })
  @Length(10, 10, { message: 'کد پستی حتما باید 10 رقم باشد' })
  postall_code: string;

  @IsString({ message: 'شماره تماس دریافت کننده باید یک رشته باشد' })
  @Length(11, 11, { message: 'شماره تماس حتما باید 11 رقم باشد' })
  reciver_phone: string;

  @IsString({ message: 'توضیحات باید یک رشته باشد' })
  @IsOptional()
  description?: string;
}
