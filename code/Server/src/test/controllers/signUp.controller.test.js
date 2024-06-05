// signupController.test.js
import SignupController from '../../user/controllers/signUp';
import SignupServices from '../../user/services/signUp';
import dotenv from 'dotenv';

dotenv.config();

jest.mock('../../user/services/signUp');  // Mock the SignupServices module

describe('SignupController', () => {

  it('should return 400 when the user already exists', async () => {
    const reqUserExistsMocked = { body: { email: 'test@example.com' } };
    const mockedResponse = {
      status: jest.fn().mockResolvedValue(400),
      send: jest.fn().mockResolvedValueOnce({ message: 'User already exists' })
    };

    SignupServices.findUser.mockResolvedValue({ email: 'test@example.com' });
    await SignupController.signup(reqUserExistsMocked, mockedResponse);

    expect(mockedResponse.status).toHaveBeenCalledWith(400);
    expect(mockedResponse.send).toHaveBeenCalledWith({ message: 'User already exists' });
  });

  it('should return 400 when the user fields are empty', async () => {
    const reqUserExistsMocked = { body: { email: '', password: '', name: '', lastName: '', phone: '', birthDate: '', rol: '' } };
    const mockedResponse = {
      status: jest.fn().mockResolvedValue(400),
      send: jest.fn().mockResolvedValueOnce({ message: 'User already exists' })
    };

    SignupServices.findUser.mockResolvedValue(undefined);
    await SignupController.signup(reqUserExistsMocked, mockedResponse);

    expect(mockedResponse.status).toHaveBeenCalledWith(400);
    expect(mockedResponse.send).toHaveBeenCalledWith({ message: 'User fields are empty' });
  });

  it('should return 201 when the user is registered successfully', async () => {
    const reqUserExistsMocked = { body: { email: 'test@mail.com', password: 'password123', name: 'John', lastName: 'Doe', phone: '1234567890', birthDate: '1990-01-01', rol: 'user' } };
    const mockedResponse = {
      status: jest.fn().mockResolvedValue(201),
      send: jest.fn().mockResolvedValueOnce({ message: 'User registered successfully' })
    };

    SignupServices.findUser.mockResolvedValue(undefined);
    SignupServices.signup.mockResolvedValue(undefined);
    SignupServices.encrypt.mockResolvedValue('encryptedPassword');
    SignupServices.signupPassword.mockResolvedValue(undefined);

    await SignupController.signup(reqUserExistsMocked, mockedResponse);

    expect(mockedResponse.status).toHaveBeenCalledWith(201);
    expect(mockedResponse.send).toHaveBeenCalledWith({ message: 'User registered successfully' });
  });
});
