import { GENDERS } from 'src/users/enum';

export class RegisterDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  gender: GENDERS;
}

export default RegisterDto;
