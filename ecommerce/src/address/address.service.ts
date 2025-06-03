import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { UpdateAddressDto } from './dto/update-address.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    try {
      const { userId, ...addressData } = createAddressDto;
      const user = await this.userRepository.findOneByOrFail({ id: userId });
      user.password = undefined;

      const address = this.addressRepository.create({
        ...addressData,
        user,
      });

      return await this.addressRepository.save(address);
    } catch (err) {
      if (err instanceof EntityNotFoundError)
        throw new NotFoundException('کاربر پیدا نشد');

      throw err;
    }
  }

  async findAll(): Promise<Address[]> {
    const addresses = await this.addressRepository.find({
      relations: ['user'],
    });

    return addresses;
  }

  async findOne(id: number): Promise<Address> {
    const address = await this.addressRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!address) {
      throw new NotFoundException(`ادرس با آیدی ${id} پیدا نشد`);
    }

    return address;
  }

  async update(
    id: number,
    updateAddressDto: UpdateAddressDto,
  ): Promise<Address> {
    const address = await this.findOne(id);
    Object.assign(address, updateAddressDto);

    return await this.addressRepository.save(address);
  }

  async remove(id: number): Promise<void> {
    const address = await this.findOne(id);
    await this.addressRepository.remove(address);
  }
}
