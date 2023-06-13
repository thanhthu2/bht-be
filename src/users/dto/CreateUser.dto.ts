import { GENDERS } from '../enum';

export class CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  gender: GENDERS;
}

export default CreateUserDto;
