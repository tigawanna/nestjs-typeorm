import { PartialType } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import {IsEmail, IsNotEmpty, Length} from "class-validator"
export class CreateUserDto extends PartialType(User) {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  username: string;
  @Length(3, 40)
  password: string;
}
