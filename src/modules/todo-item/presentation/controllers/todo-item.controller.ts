
import { ApiConsumes, ApiCreatedResponse, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { TodoItemService } from "../../application/services/todo-item.service";
import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Res } from "@nestjs/common";
import { Auth } from "src/modules/auth/presentation/decorators/auth.decorator";
import { BulkCreateTodoItemDto, CreateTodoItemDto } from "../../application/dto/create-todo-item.dto";
import { Response } from "express";
import { UserDocument } from "src/modules/user/infrastructure/database/user.schema";
import { USER } from "src/modules/user/presentation/decorators/user.decorator";
import { IdDTo } from "src/shared/dto/id.dto";
import { UpdateTodoItemDto } from '../../application/dto/update-todo-item.dto';
import { TodoItemDto } from "../../application/dto/todo-item.dto";

@ApiTags('TodoItem')
@Auth()
@Controller()
export class TodoItemController {
    constructor(
        private readonly todoService: TodoItemService
    ) { }

    @ApiOperation({ summary: 'Creat New todo items' })
    @ApiConsumes('application/json')
    @ApiCreatedResponse({ type: '' })
    @Post('todo/itm')
    async bulkCreateTodoItem(
        @Body() todoItems: BulkCreateTodoItemDto,
        @Res() res: Response
    ) {
        let response = await this.todoService.bulkCreateTodoItem(todoItems);
        res.status(HttpStatus.CREATED).json(response);
    }

    @ApiOperation({ summary: 'Update a todo list' })
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOkResponse({ type: TodoItemDto })
    @Patch('todo/itm/:id')
    async updateTodoItem(
        @Body() todoItem: UpdateTodoItemDto,
        @Param() param: IdDTo,
        @USER() user: UserDocument,
        @Res() res: Response
    ) {
        let response = await this.todoService.updateTodoItem(param, todoItem);
        res.status(HttpStatus.OK).json(response);
    }

    @ApiOperation({ summary: 'Delete a todo list' })
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOkResponse()
    @ApiForbiddenResponse()
    @Delete('todo/itm/:id')
    async deleteTodoItem(
        @Param() param: IdDTo,
        @USER() user: UserDocument,
        @Res() res: Response
    ) {
        let response = await this.todoService.deleteTodoItem(param, user);
        let status = HttpStatus.OK;
        if (typeof response == 'string')
            status = HttpStatus.FORBIDDEN
        res.status(status).json(response);
    }

    @ApiOperation({ summary: 'Get all todo items of a list' })
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOkResponse()
    @ApiForbiddenResponse()
    @Get(':id/todo/itm')
    async getAllUserTodoItems(
        @Param() param: IdDTo,
        @Res() res: Response
    ) {
        let response = await this.todoService.getAllUserTodoItems(param);
        let status = HttpStatus.OK;
        if (typeof response == 'string')
            status = HttpStatus.FORBIDDEN
        res.status(HttpStatus.OK).json(response);
    }

    @ApiOperation({ summary: 'Get a todo item by id' })
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiOkResponse()
    @Get('todo/itm/:id')
    async getTodoItemById(
        @Param() param: IdDTo,
        @Res() res: Response
    ) {
        let response = await this.todoService.getTodoItemById(param);
        res.status(HttpStatus.OK).json(response);
    }



}