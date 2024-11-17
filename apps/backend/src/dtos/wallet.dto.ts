import { IsNotEmpty, IsString } from 'class-validator';

export class WalletDto {
  @IsString()
  @IsNotEmpty()
  public userId: string;
}
