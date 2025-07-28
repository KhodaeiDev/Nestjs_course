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
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Res() res: Response,
  ) {
    const product = await this.productsService.create(createProductDto);

    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: product,
      message: 'محصول با موفقیت ساخته شد',
    });
  }

  @Get()
  async findAll(@Res() res: Response) {
    const products = await this.productsService.findAll();

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: products,
      message: 'لیست محصولات موفقیت دریافت شد',
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    const product = await this.productsService.findOne(+id);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: product,
      message: 'محصول با موفقیت دریافت شد',
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Res() res: Response,
  ) {
    const product = await this.productsService.update(+id, updateProductDto);

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: product,
      message: 'محصول با موفقیت آپدیت شد',
    });
  }

  @Post('toggleBookmarks')
  async toggleBookmark(
    @Query('userId') userId: string,
    @Query('productId') productId: string,
    @Res() res: Response,
  ) {
    const toggleBookmark = await this.productsService.toggleBookmark(
      +userId,
      +productId,
    );

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: null,
      message: toggleBookmark,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
