import { StatusEndpoint, TypeEndpoint } from '../enum';

export class CreateEndpointDto {
  domain: string;
  type: TypeEndpoint;
  status: StatusEndpoint;
}
