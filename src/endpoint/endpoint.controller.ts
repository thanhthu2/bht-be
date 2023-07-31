import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EndpointService } from './endpoint.service';
import { CreateEndpointDto } from './dto/create-endpoint.dto';
import { UpdateEndpointDto } from './dto/update-endpoint.dto';

@Controller('endpoint')
export class EndpointController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly endpointService: EndpointService) {}

  @Post()
  create(@Body() createEndpointDto: CreateEndpointDto) {
    return this.endpointService.createEndpoint(createEndpointDto);
  }

  @Get()
  getAllPosts(@Query() { page, pageSize }) {
    return this.endpointService.getAllEndpoints(Number(page),Number(pageSize));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.endpointService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEndpointDto: UpdateEndpointDto) {
    return this.endpointService.update(+id, updateEndpointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.endpointService.remove(+id);
  }
}
