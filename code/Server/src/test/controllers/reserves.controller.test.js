// reservationsController.test.js
import { ReservationsController } from '../../reserves/controllers/reservation';
import ReservesServices from '../../reserves/services/reservation';

jest.mock('../../reserves/services/reservation');

describe('ReservationsController', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {},
      params: {},
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createReservation', () => {
    it('should create a reservation and return status 201', async () => {
      req.body = {
        email: 'test@example.com',
        lastName: 'Doe',
        checkIn: '2024-06-10',
        checkOut: '2024-06-12',
      };

      await ReservationsController.createReservation(req, res);

      expect(ReservesServices.createReservation).toHaveBeenCalledWith(
        'test@example.com',
        'Doe',
        '2024-06-10',
        '2024-06-12'
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith({ message: 'Reservation created successfully.' });
    });

    it('should return status 500 if there is an error', async () => {
      const errorMessage = 'Internal Server Error';
      ReservesServices.createReservation.mockRejectedValue(new Error(errorMessage));

      await ReservationsController.createReservation(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(errorMessage);
    });
  });

  describe('getReservations', () => {
    it('should get all reservations and return status 200', async () => {
      const mockReservations = [{ id: 1, email: 'test@example.com', lastName: 'Doe' }];
      ReservesServices.getReservations.mockResolvedValue(mockReservations);

      await ReservationsController.getReservations(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockReservations);
    });

    it('should return status 500 if there is an error', async () => {
      const errorMessage = 'Internal Server Error';
      ReservesServices.getReservations.mockRejectedValue(new Error(errorMessage));

      await ReservationsController.getReservations(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(errorMessage);
    });
  });

  describe('getReservationById', () => {
    it('should get a reservation by ID and return status 200', async () => {
      req.body = { id: 1 };
      const mockReservation = { id: 1, email: 'test@example.com', lastName: 'Doe' };
      ReservesServices.getReservationById.mockResolvedValue(mockReservation);

      await ReservationsController.getReservationById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(mockReservation);
    });

    it('should return status 500 if there is an error', async () => {
      const errorMessage = 'Internal Server Error';
      ReservesServices.getReservationById.mockRejectedValue(new Error(errorMessage));

      await ReservationsController.getReservationById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(errorMessage);
    });
  });

  describe('deleteReservation', () => {
    it('should delete a reservation and return status 204 if found', async () => {
      req.params.id = 1;
      const mockResult = { rowsAffected: [1] };
      ReservesServices.deleteReservation.mockResolvedValue(mockResult);

      await ReservationsController.deleteReservation(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalledWith({ message: 'Reservation deleted successfully.' });
    });

    it('should return status 404 if reservation is not found', async () => {
      req.params.id = 1;
      const mockResult = { rowsAffected: [0] };
      ReservesServices.deleteReservation.mockResolvedValue(mockResult);

      await ReservationsController.deleteReservation(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: 'Reservation not found.' });
    });

    it('should return status 500 if there is an error', async () => {
      req.params.id = 1;
      const errorMessage = 'Internal Server Error';
      ReservesServices.deleteReservation.mockRejectedValue(new Error(errorMessage));

      await ReservationsController.deleteReservation(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(errorMessage);
    });
  });
});
