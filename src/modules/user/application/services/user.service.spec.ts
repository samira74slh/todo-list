import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { UserService } from './user.service';
import { AuthService } from '../../../auth/application/services/auth.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserDocument } from '../../infrastructure/database/user.schema';
import { UserWelcomeEvent } from '../events/user-welcom.event';
import { IdDTo } from '../../../../shared/dto/id.dto';
import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { ObjectId, Types } from 'mongoose';

const mockCommandBus = { execute: jest.fn() };
const mockQueryBus = { execute: jest.fn() };
const mockEventBus = { publish: jest.fn() };
const mockAuthService = { getAccessToken: jest.fn() };

describe('UserService', () => {
    let userService: UserService;
    let commandBus: CommandBus;
    let queryBus: QueryBus;
    let eventBus: EventBus;
    let authService: AuthService;
    let username = 'samira';
    let password = 'password1234';
    let _id = new Types.ObjectId('66fd6b62e94d49dc723580d5');
    let token = 'token123';

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                { provide: CommandBus, useValue: mockCommandBus },
                { provide: QueryBus, useValue: mockQueryBus },
                { provide: EventBus, useValue: mockEventBus },
                { provide: AuthService, useValue: mockAuthService },
            ],
        }).compile();

        userService = module.get<UserService>(UserService);
        commandBus = module.get<CommandBus>(CommandBus);
        queryBus = module.get<QueryBus>(QueryBus);
        eventBus = module.get<EventBus>(EventBus);
        authService = module.get<AuthService>(AuthService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('createUser', () => {
        it('should return "Duplicate username" if user already exists', async () => {
            const userDto: CreateUserDto = { username, password };
            mockQueryBus.execute.mockResolvedValueOnce(true);
            const result = await userService.createUser(userDto);
            expect(result).toBe('Duplicate username');
        });

        it('should create a user if username is available', async () => {
            const userDto: CreateUserDto = { username, password };
            mockQueryBus.execute.mockResolvedValueOnce(null);
            mockCommandBus.execute.mockResolvedValueOnce({ _id, ...userDto, token });
            const result = await userService.createUser(userDto);
            // expect(result).toEqual({ username, _id, token });
            // console.log(result);
            // console.log({ username, _id, token });
            expect(result).toHaveProperty('_id', _id);
            expect(result).toHaveProperty('_id', _id);
            expect(result).toHaveProperty('token', token);
        });
    });

    describe('login', () => {
        it('should return a user with a token on successful login', async () => {
            const user: UserDocument = { username, _id } as any;
            mockAuthService.getAccessToken.mockResolvedValueOnce(token);
            mockEventBus.publish.mockImplementation(() => { });

            const result = await userService.login(user);
            expect(result).toEqual({ _id, username, token });
            expect(mockAuthService.getAccessToken).toHaveBeenCalledWith(user);
            // expect(mockEventBus.publish).toHaveBeenCalledWith(new UserWelcomeEvent(user.username));
        });
    });

    describe('getUserById', () => {
        it('should return a user by ID', async () => {
            const idDto: IdDTo = { id: _id };
            const user = { _id, username };
            mockQueryBus.execute.mockResolvedValueOnce(user);

            const result = await userService.getUserById(idDto);
            expect(result).toEqual(user);
        });
    });

    describe('getUserByFilter', () => {
        it('should return a user by filter', async () => {
            const userDto = { username };
            const user = { _id, username };
            mockQueryBus.execute.mockResolvedValueOnce(user);

            const result = await userService.getUserByFilter(userDto);
            expect(result).toEqual(user);
        });
    });
});
