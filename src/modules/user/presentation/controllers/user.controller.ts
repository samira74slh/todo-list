import { ApiBadRequestResponse, ApiConsumes, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserService } from "../../application/services/user.service";
import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "../../application/dto/create-user.dto";
import { Response } from "express";
import { IdDTo } from "../../../../shared/dto/id.dto";
import { UserDto } from "../../application/dto/user.dto";
import { UserWithTokenResDto } from "../../application/dto/user-with-token-res.dto";
import { USER } from "../decorators/user.decorator";
import { UserDocument } from "../../infrastructure/database/user.schema";
import { Auth } from '../../../auth/presentation/decorators/auth.decorator';
import { LocalAuthGuard } from '../../../auth/presentation/guards/local-auth.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @ApiOperation({ summary: 'The user registration' })
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiCreatedResponse({ type: UserWithTokenResDto })
    @ApiBadRequestResponse()
    @Post('/register')
    async register(
        @Body() info: CreateUserDto,
        @Res() res: Response
    ) {
        let response = await this.userService.createUser(info);
        let status = HttpStatus.CREATED;
        if (typeof response == 'string')
            status = HttpStatus.BAD_REQUEST;
        res.status(status).json(response);
    }

    @ApiOperation({ summary: 'Login the user' })
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiCreatedResponse({ type: UserWithTokenResDto })
    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(
        @Body() info: CreateUserDto,
        @USER() user: UserDocument,
        @Res() res: Response
    ) {
        let response = await this.userService.login(user);
        res.status(HttpStatus.OK).json(response);
    }

    @ApiOperation({ summary: 'Get user by id' })
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOkResponse({ type: UserDto })
    @ApiNotFoundResponse()
    @Auth()
    @Get('/:id')
    async getUser(
        @Param() param: IdDTo,
        @Res() res: Response
    ) {
        let response = await this.userService.getUserById(param);
        let status = HttpStatus.OK;
        if (typeof response == 'string')
            status = HttpStatus.NOT_FOUND;
        res.status(status).json(response)
    }

}