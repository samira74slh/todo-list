
import { ApiConsumes, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { TodoListService } from "../../application/services/todo-list.service";
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from "@nestjs/common";
import { CreateTodoListDto } from "../../application/dto/create-todo-list.dto";
import { Response } from "express";
import { IdDTo } from "../../../../shared/dto/id.dto";
import { UpdateTodoListDto } from '../../application/dto/update-todo-list.dto';
import { Auth } from '../../../auth/presentation/decorators/auth.decorator';
import { USER } from '../../../user/presentation/decorators/user.decorator';
import { UserDocument } from '../../../user/infrastructure/database/user.schema';

@ApiTags('TodoList')
@Auth()
@Controller()
export class TodoListController {
    constructor(
        private readonly todoService: TodoListService
    ) { }

    @ApiOperation({ summary: 'Creat New TodoList' })
    @ApiConsumes('application/json')
    @ApiCreatedResponse({ type: '' })
    @Post('todo/ls')
    async createTodoList(
        @Body() todoList: CreateTodoListDto,
        @USER() user: UserDocument,
        @Res() res: Response
    ) {
        let response = await this.todoService.createTodoList(todoList, user);
        res.status(HttpStatus.CREATED).json(response);
    }

    @ApiOperation({ summary: 'Update a todo list' })
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOkResponse({ type: '' })
    @ApiForbiddenResponse()
    @Patch('todo/ls/:id')
    async updateTodoList(
        @Body() todoList: UpdateTodoListDto,
        @Param() param: IdDTo,
        @USER() user: UserDocument,
        @Res() res: Response
    ) {
        let response = await this.todoService.updateTodoList(param, todoList, user);
        let status = HttpStatus.OK;
        if (typeof response == 'string')
            status = HttpStatus.FORBIDDEN
        res.status(status).json(response);
    }

    @ApiOperation({ summary: 'Delete a todo list' })
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOkResponse()
    @ApiForbiddenResponse()
    @Delete('todo/ls/:id')
    async deleteTodoList(
        @Param() param: IdDTo,
        @USER() user: UserDocument,
        @Res() res: Response
    ) {
        let response = await this.todoService.deleteTodoList(param, user);
        let status = HttpStatus.OK;
        if (typeof response == 'string')
            status = HttpStatus.FORBIDDEN
        res.status(status).json(response);
    }

    @ApiOperation({ summary: 'Get all todo lists of a user' })
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOkResponse()
    @ApiForbiddenResponse()
    @Get(':id/todo/ls')
    async getAllUserTodoLists(
        @Param() param: IdDTo,
        @USER() user: UserDocument,
        @Res() res: Response
    ) {
        let response = await this.todoService.getAllUserTodoLists(param, user);
        let status = HttpStatus.OK;
        if (typeof response == 'string')
            status = HttpStatus.FORBIDDEN
        res.status(HttpStatus.OK).json(response);
    }

    @ApiOperation({ summary: 'Get a todo lists by id' })
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOkResponse()
    @Get('todo/ls/:id')
    async getTodoListById(
        @Param() param: IdDTo,
        @Res() res: Response
    ) {
        let response = await this.todoService.getTodoListById(param);
        res.status(HttpStatus.OK).json(response);
    }



}