import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { CreateUserDto } from '../src/modules/user/application/dto/create-user.dto';
import { AppModule } from '../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  var userId: string;
  var token: string;
  var username = 'samira';
  var password = 'password1234';
  const baseUrl = 'http://localhost:3000/api/user';

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /user/register should create a user', async () => {
    const createUserDto: CreateUserDto = {
      username,
      password
    };
    const response = await request(baseUrl)
      .post('/register')
      .send(createUserDto)
      .expect(201);
    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('_id');
    expect(response.body.username).toEqual(username);
    userId = response?.body?._id;
    token = response?.body?.token;
  });

  it('POST /user/login should log in the user', async () => {
    const loginDto: CreateUserDto = { username, password };
    const response = await request(baseUrl)
      .post('/login')
      .send(loginDto)
      .expect(200);

    expect(response.body).toHaveProperty('token');
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('username', username);
    userId = response?.body?._id;
    token = response?.body?.token;
  });

  it('GET /user/:id should return user by ID', async () => {

    const response = await request(baseUrl)
      .get(`/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(response.body).toHaveProperty('_id', userId);
  });

  it('GET /user/:id should return 404 if user not found', async () => {
    const userId = '66fd45954845d4bfe72e78c0';

    const response = await request(baseUrl)
      .get(`/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(404);
  });
});