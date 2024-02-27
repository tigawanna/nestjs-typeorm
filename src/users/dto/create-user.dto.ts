import { PartialType } from '@nestjs/mapped-types';
import { User } from '../entities/user.entity';
import {IsEmail, IsNotEmpty, Length} from "class-validator"
export class CreateUserDto extends PartialType(User) {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  username: string;
  @Length(3, 40, {
    message: 'Password must be between 3 and 40 characters',
  })
  password: string;
}
