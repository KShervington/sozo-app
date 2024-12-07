import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  public username: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  public password: string;

  @IsOptional()
  @IsString()
  public bio: string;
}

export class UserPatchDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  public username: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  public password: string;

  @IsOptional()
  @IsString()
  public bio: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public walletAddress: string;
}
