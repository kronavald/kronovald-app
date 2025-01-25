import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
    users: { id: number; name: string; age:number; content: string }[] = [];
    counterId = 1

    create(createUserDto: CreateUserDto){
        const newUser = {
            id: this.counterId++,
            ...createUserDto
        }

        this.users.push(newUser)

        return newUser
    }

    findAll(){
        return this.users
    }

    findOne(id:number){
        return this.users.find(user => user.id === id)
    }

    update(id:number, createUserDto:CreateUserDto){
        const user = this.findOne(id)

        if(user){
            user.name = createUserDto.name

            user.age = createUserDto.age

            user.content = createUserDto.content

            return user
        }
        return null
    }

    remove(id: number){
        this.users = this.users.filter(user => user.id != id)
    }
}
