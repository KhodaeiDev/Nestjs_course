import { Injectable } from '@nestjs/common';
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

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
