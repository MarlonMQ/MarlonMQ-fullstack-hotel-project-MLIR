import RoomsController from '../../rooms/controllers/rooms';
import RoomsServices from '../../rooms/services/rooms';
import { deleteImageFromBucket } from '../../utils/bucketManager';
import path from 'path';

jest.mock('../../rooms/services/rooms');
jest.mock('../../utils/bucketManager');

describe('RoomsController', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      file: {
        filename: 'test_image.jpg',
      },
      protocol: 'http',
      get: jest.fn().mockReturnValue('localhost:3000'),
      query: {
        url: 'http://example.com/test_image.jpg',
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getDataRooms', () => {
    it('should return data rooms with status 200', async () => {
      const mockDataRooms = [{ id: 1, type: 'Single', price: 50 }];
      RoomsServices.getDataRooms.mockResolvedValue(mockDataRooms);

      await RoomsController.getDataRooms(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockDataRooms);
    });

    it('should return status 500 if there is an error', async () => {
      const errorMessage = 'Internal Server Error';
      RoomsServices.getDataRooms.mockRejectedValue(new Error(errorMessage));

      await RoomsController.getDataRooms(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(errorMessage);
    });
  });

  describe('uploadRoom', () => {
    it('should upload room and return status 201', async () => {
      req.body = {
        type: 'Single',
        price: 50,
        availables: 5,
        capacity: 1,
        description: 'Comfortable room',
      };

      await RoomsController.uploadRoom(req, res);

      expect(RoomsServices.uploadRoom).toHaveBeenCalledWith(
        'Single',
        50,
        5,
        1,
        'Comfortable room',
        'http://localhost:3000/uploads/test_image.jpg'
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({ message: 'Room uploaded successfully' });
    });

    it('should return status 500 if there is an error', async () => {
      const errorMessage = 'Internal Server Error';
      RoomsServices.uploadRoom.mockRejectedValue(new Error(errorMessage));

      await RoomsController.uploadRoom(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(errorMessage);
    });
  });

  describe('deleteRoom', () => {
    it('should delete room, delete image from bucket, and return status 204', async () => {
      await RoomsController.deleteRoom(req, res);

      expect(RoomsServices.deleteRoom).toHaveBeenCalledWith('http://example.com/test_image.jpg');
      expect(deleteImageFromBucket).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalledWith({ message: 'Room deleted successfully' });
    });

    it('should return status 500 if there is an error', async () => {
      const errorMessage = 'Internal Server Error';
      RoomsServices.deleteRoom.mockRejectedValue(new Error(errorMessage));

      await RoomsController.deleteRoom(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(errorMessage);
    });
  });
});
