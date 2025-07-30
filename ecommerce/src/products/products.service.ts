import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { In, Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';
import { Bookmark } from './entities/bookmark.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

      if (categories.length === 0)
        throw new NotFoundException('دسته بندی مورد نظر یافت نشد');
      product.categories = categories;
    }

    return product;
  }

  async toggleBookmark(userId: number, productId: number): Promise<string> {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!user || !product)
      throw new NotFoundException('محصول یا کاربر مورد نظر یافت نشد');

    const existBookmark = await this.bookmarkRepository.findOne({
      where: { user: { id: userId }, product: { id: productId } },
    });

    if (existBookmark) {
      await this.bookmarkRepository.remove(existBookmark);
      return 'محصول مورد نظر با موفقیت از بوک مارک ها حذف شد';
    } else {
      const bookmark = this.bookmarkRepository.create({
        user,
        product,
      });

      await this.bookmarkRepository.save(bookmark);

      return 'محصول مورد نظر به لیست بوک مارک ها اضافه شد';
    }
  }

  async addToBasket(userId: number, productId: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['basket_items'],
    });

    if (!product || !user)
      throw new NotFoundException('محصول یا کاربر مورد نظر یافت نشد');

    user.basket_items.push(product);

    await this.userRepository.save(user);

    return user;
  }

  async removeFromBasket(userId: number, productId: number) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['basket_items'],
    });

    if (!product || !user)
      throw new NotFoundException('محصول یا کاربر مورد نظر یافت نشد');

    const index = user.basket_items.findIndex((item) => item.id === product.id);

    if (index === -1)
      throw new NotFoundException('محصول درون سبد خرید شما وجود ندارد');

    user.basket_items.splice(index, 1);
    await this.userRepository.save(user);

    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
