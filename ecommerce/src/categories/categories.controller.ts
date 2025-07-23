import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Response } from 'express';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
    @Res() res: Response,
  ) {
    const category = await this.categoriesService.create(createCategoryDto);

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: category,
      message: 'دسته بندی با موفقیت ساخته شد',
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const categories = await this.categoriesService.findAll();

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: categories,
      message: 'لیست دسته بندی ها با موفقیت دریافت شد',
    });
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.categoriesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
  //   return this.categoriesService.update(+id, updateCategoryDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.categoriesService.remove(+id);
  // }
}
