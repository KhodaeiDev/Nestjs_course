import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import projectStatusEnum from './enums/projectStatusEnum';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const newProject = this.projectRepository.create(createProjectDto);

    return this.projectRepository.save(newProject);
  }

  async findAll(
    status?: projectStatusEnum,
    limit: number = 5,
    page: number = 1,
  ) {
    const query = this.projectRepository.createQueryBuilder('project');

    if (status) {
      await query.where('status = :status', { status });
    }

    query.skip((page - 1) * limit).take(limit);
    const project = await query.getMany();

    return {
      page: +page,
      limit: +limit,
      project,
    };
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOneBy({ id });

    if (!project) throw new NotFoundException('Project not Found!');

    return project;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const project = await this.projectRepository.findOneBy({ id });

    if (!project) throw new NotFoundException('Project not Found!');

    try {
      const updateProject = await this.projectRepository.update(
        id,
        updateProjectDto,
      );

      return updateProject;
    } catch {
      throw new BadRequestException('Update Project faild');
    }
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
