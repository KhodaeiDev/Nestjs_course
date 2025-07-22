import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Repository } from 'typeorm';
import { Ticket } from './entities/ticket.entity';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketsRepository: Repository<Ticket>,
    private readonly userService: UsersService,
  ) {}

  async create(createTicketDto: CreateTicketDto) {
    let { userId, replyTo, ...ticketData } = createTicketDto;

    const user = await this.userService.findOne(userId);

    let replyTicket = null;
    if (replyTo) {
      replyTicket = await this.ticketsRepository.findOne({
        where: { id: replyTo },
        relations: ['replyTo'],
      });

      if (replyTicket.replyTo)
        throw new BadRequestException('شما نمیتوانید به این تیکت پاسخ دهید');
    }

    const newTicket = this.ticketsRepository.create({
      ...ticketData,
      user,
      replyTo: replyTicket,
    });

    return this.ticketsRepository.save(newTicket);
  }

  async findAll() {
    return await this.ticketsRepository
      .createQueryBuilder('tickets')
      .where('tickets.replyTo IS NULL')
      .leftJoinAndSelect('tickets.replyTo', 'replyTo')
      .getMany();
  }

  async findOne(id: number): Promise<Ticket> {
    const ticket = await this.ticketsRepository.findOneOrFail({
      where: { id },
      relations: ['replies', 'replyTo'],
    });

    return ticket;
  }
}
