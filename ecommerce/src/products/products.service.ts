import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { title, description, price, stock, categoryIds } = createProductDto;

    const product = this.productRepository.create({
      title,
      description,
      price,
      stock,
    });

    if (categoryIds) {
      const categories = await this.categoryRepository.findBy({
        id: In(categoryIds),
      });
      if (categories.length === 0)
        throw new NotFoundException('دسته بندی مورد نظر یافت نشد');
      product.categories = categories;
    }

    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find({
      relations: ['categories'],
    });

    return products;
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['categories'],
    });

    if (!Product) throw new NotFoundException('محصول مورد نظر یافت نشد');

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { title, description, price, stock, categoryIds } = updateProductDto;

    const product: Product = await this.findOne(id);

    if (title) product.title = title;
    if (description) product.description = description;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (categoryIds) {
      const categories = await this.categoryRepository.findBy({
        id: In(categoryIds),
      });

      console.log(categories);

      if (categories.length === 0)
        throw new NotFoundException('دسته بندی مورد نظر یافت نشد');
      product.categories = categories;
    }

    return product;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
