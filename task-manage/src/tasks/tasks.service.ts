import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Project } from 'src/projects/entities/project.entity';
import tasksStatusEnum from './enums/taskStatusEnum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    try {
      const { projectId, ...taskData } = createTaskDto;

      const project = await this.projectRepository.findOneBy({
        id: projectId,
      });

      if (!project) {
        throw new NotFoundException('Project Not Found');
      }

      const newTask = this.taskRepository.create({
        ...taskData,
        project: { id: project.id } as DeepPartial<Project>,
      });

      return await this.taskRepository.save(newTask);
    } catch {
      throw new BadRequestException('Error in create Task');
    }
  }

  async findAll(
    status?: tasksStatusEnum,
    page: number = 1,
    limit: number = 10,
  ) {
    const query = await this.taskRepository
      .createQueryBuilder('tasks')
      .leftJoinAndSelect('tasks.project', 'project');

    if (status) {
      query.where('tasks.status = :status', { status });
    }

    query.skip((page - 1) * limit).take(limit);
    const tasks = await query.getMany();

    return {
      page: +page,
      limit: +limit,
      tasks,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
