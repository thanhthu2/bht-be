import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEndpointDto } from './dto/create-endpoint.dto';
import { UpdateEndpointDto } from './dto/update-endpoint.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Endpoint } from './endpoint.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EndpointService {
  constructor(
    // eslint-disable-next-line prettier/prettier
    @InjectRepository(Endpoint)
    private endpointRepository: Repository<Endpoint>
  ) { }

  async createEndpoint(endpoint: CreateEndpointDto) {
    const newEndpoint = await this.endpointRepository.create(endpoint);
    await this.endpointRepository.save(newEndpoint);
    return newEndpoint;
  }

  async getAllEndpoints(page = 1, pageSize = 20) {
    const [results, totalItems] = await this.endpointRepository
      .createQueryBuilder('endpoint')
      .orderBy('endpoint.updatedAt', 'DESC')
      .skip((+page - 1) * +pageSize)
      .take(+pageSize)
      .getManyAndCount()

    return {
      items: results,
      meta: {
        totalItems,
        currentPage: page,
        itemCount: results.length,
        itemsPerPage: pageSize
      }
    }
  }

  async getEndpointById(id: number) {
    const endpoint = await this.endpointRepository.findOneBy({
      id
    })
    if (endpoint) return endpoint
    throw new HttpException('Endpoint not found', HttpStatus.NOT_FOUND);
  }

  async updateEndpoint(id: number, endpoint: UpdateEndpointDto) {
    const findEndpoint = await this.endpointRepository.findOneBy({ id });
    if (!findEndpoint) throw new HttpException('Endpoint not found', HttpStatus.NOT_FOUND);
    await this.endpointRepository.update(id, endpoint);
    return true
  }

  update(id: number, updateEndpointDto: UpdateEndpointDto) {
    return `This action updates a #${id} endpoint`;
  }

  async deleteEndpoint(id: number) {
    const deleteResponse = await this.endpointRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new HttpException('Endpoint not found', HttpStatus.NOT_FOUND);
    }
  }
}
