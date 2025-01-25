import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto){
    return this.usersService.create(createUserDto)
  }

  @Get()
  findAll(){
    return this.usersService.findAll()
  }

  @Get(":id")
  findOne(@Param('id') id:string){
    return this.usersService.findOne(Number(id))
  }

  @Patch(":id")
  update(@Param('id') id:string , @Body() createUserDto:CreateUserDto){
    return this.usersService.update(Number(id), createUserDto)
  }

  @Delete(":id")
  remove(@Param('id') id:string){
    this.usersService.remove(Number(id))

    return null
  }
}
