import { ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserService } from "../../application/services/user.service";
import { Body, Controller, Get, HttpStatus, Param, Post, Res } from "@nestjs/common";
import { CreateUserDto } from "../../application/dto/create-user.dto";
import { Response } from "express";
import { IdDTo } from "src/shared/dto/id.dto";
import { UserDto } from "../../application/dto/user.dto";

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @ApiOperation({ summary: 'The user registration' })
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiCreatedResponse({ type: UserDto })
    @Post('/register')
    async register(
        @Body() info: CreateUserDto,
        @Res() res: Response
    ) {
        let response = await this.userService.createUser(info);
        res.status(HttpStatus.CREATED).json(response);
    }

    @ApiOperation({ summary: 'Get user by id' })
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOkResponse({ type: UserDto })
    @Get('/:id')
    async getUser(
        @Param() param: IdDTo,
        @Res() res: Response
    ) { }
}