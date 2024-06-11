import LoginController from '../../user/controllers/login';
import LoginServices from '../../user/services/login';

jest.mock('../../user/services/login');

describe('LoginController', () => {

  it('should return 404 when the user and password are empty', async () => {
    const reqUserNotFoundMocked = { body: { email: '', password: '' } };
    const mockedResponse = {
      status: jest.fn().mockResolvedValue(404),
      send: jest.fn().mockResolvedValueOnce(null)
    };
    await LoginController.login(reqUserNotFoundMocked, mockedResponse);

    expect(mockedResponse.status).toHaveBeenCalledWith(404);
    expect(mockedResponse.send).toHaveBeenCalledWith('Invalid email or password');
  });

  it('should return 404 when the user does not exist', async () => {

    const reqUserNotFoundMocked = { body: { email: 'notFound@mail.com', password: 'password123' } };
    const mockedResponse = {
      status: jest.fn().mockResolvedValue(404),
      send: jest.fn().mockResolvedValueOnce(null)
    };
    await LoginController.login(reqUserNotFoundMocked, mockedResponse);

    expect(mockedResponse.status).toHaveBeenCalledWith(404);
    expect(mockedResponse.send).toHaveBeenCalledWith('Invalid email or password');
  });

  it('should return 404 when the password is incorrect', async () => {
    const reqIncorrectPasswordMocked = { body: { email: 'test@example.com', password: 'incorrect123' } };
    const mockedResponse = {
      status: jest.fn().mockResolvedValue(404),
      send: jest.fn().mockResolvedValueOnce(null)
    };

    await LoginController.login(reqIncorrectPasswordMocked, mockedResponse);
    expect(mockedResponse.status).toHaveBeenCalledWith(404);
    expect(mockedResponse.send).toHaveBeenCalledWith('Invalid email or password');
  });

  it('should return 200 and a token if login is successful', async () => {
    const reqCorrectPasswordMocked = { body: { email: 'test@example.com', password: 'password123' } };
    
    
    const mockUser = { id: 1, email: 'test@example.com' };
    const mockToken = 'mockToken';
    const mockRol = 'user';

    LoginServices.login.mockResolvedValue(mockUser);
    LoginServices.getRol.mockResolvedValue(mockRol);
    LoginServices.generateAccessToken.mockResolvedValue(mockToken);


    const mockedResponse = {
      status: jest.fn().mockResolvedValue(200),
      send: jest.fn().mockResolvedValueOnce({ message: 'Login successful', rol: mockRol, token: mockToken })
    };
    await LoginController.login(reqCorrectPasswordMocked, mockedResponse);

    expect(mockedResponse.status).toHaveBeenCalledWith(200);    
    expect(mockedResponse.send).toHaveBeenCalledWith({
      message: 'Login successful',
      rol: mockRol,
      token: mockToken,
    });
  });  
});
