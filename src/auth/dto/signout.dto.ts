import { IsNotEmpty, IsString } from 'class-validator';

export class SignoutUserDto {
  @IsNotEmpty()
  @IsString()
  usernameOrEmail: string;

}
