import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class ProductDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  public name: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  public price: number;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsString()
  @IsNotEmpty()
  public imageUrl: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty()
  public stock: number;

  @IsString()
  @IsNotEmpty()
  public nftId: string;

  @IsString()
  @IsNotEmpty()
  public seller: string;
}

export class ProductPatchDto {
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
}
