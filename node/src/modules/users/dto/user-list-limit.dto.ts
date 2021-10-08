import { IsNumberString, IsOptional } from "class-validator";

export default class UserListLimit {
  @IsOptional()
  @IsNumberString()
  limit?: number;

  @IsOptional()
  @IsNumberString()
  offset?: number;
}
