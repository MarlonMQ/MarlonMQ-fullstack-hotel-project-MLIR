import CryptoJS from 'crypto-js';
import DbConnection from "../../config/dbconnection.js";
import sql from "mssql";

const encryptionKey = process.env.ENCRYPTION_KEY; // Asegúrate de tener una clave de cifrado segura

class PaymentService {
  static async saveCardDetails(cardDetails) {
    const { id, cardNumber, cardHolder, expiryDate, cvv, userEmail } = cardDetails;

    // Cifrar datos sensibles
    const encryptedCardNumber = CryptoJS.AES.encrypt(cardNumber, encryptionKey).toString();
    const encryptedCvv = CryptoJS.AES.encrypt(cvv, encryptionKey).toString();

    const pool = await DbConnection.getInstance().getConnection();
    
    const query = `
      INSERT INTO payment (id, card_holder, card_number, expiry_date, cvv, user_email, active)
      VALUES (@id, @cardHolder, @cardNumber, @expiryDate, @cvv, @userEmail, @active)
    `;

    try {
      await pool.request()
        .input('id', sql.UniqueIdentifier, id)
        .input('cardHolder', sql.NVarChar, cardHolder)
        .input('cardNumber', sql.NVarChar, encryptedCardNumber)
        .input('expiryDate', sql.NVarChar, expiryDate)
        .input('cvv', sql.NVarChar, encryptedCvv)
        .input('userEmail', sql.NVarChar, userEmail)
        .input('active', sql.Bit, true) // Assuming you want the card to be active by default
        .query(query);

      return { id, cardHolder, userEmail };
    } catch (error) {
      throw new Error('Error al guardar los detalles de la tarjeta: ' + error.message);
    }
  }

  static async getPayment() {
    try {
      const pool = await DbConnection.getInstance().getConnection();
      const query = `
        SELECT id, card_holder, card_number, expiry_date, cvv, user_email 
        FROM payment
        WHERE active = 1
      `;

      const result = await pool.request().query(query);

      // Desencriptar los datos sensibles
      const payments = result.recordset.map(payment => {
        const decryptedCardNumber = CryptoJS.AES.decrypt(payment.card_number, encryptionKey).toString(CryptoJS.enc.Utf8);
        const decryptedCvv = CryptoJS.AES.decrypt(payment.cvv, encryptionKey).toString(CryptoJS.enc.Utf8);

        return {
          id: payment.id,
          cardHolder: payment.card_holder,
          cardNumber: decryptedCardNumber,
          expiryDate: payment.expiry_date,
          cvv: decryptedCvv,
          userEmail: payment.user_email,
        };
      });

      return payments;
    } catch (error) {
      throw new Error('Error al obtener los detalles de pago: ' + error.message);
    }
  }


    static async getCards(userEmail) {
        const pool = await DbConnection.getInstance().getConnection();
        const query = `
          SELECT card_holder, card_number, expiry_date, id
          FROM payment
          WHERE user_email = @userEmail AND active = 1
        `;
    
        try {
          const result = await pool.request()
            .input('userEmail', sql.NVarChar, userEmail)
            .query(query);
    
          if (result.recordset.length > 0) {
            // Desencriptar los datos sensibles
            const cards = result.recordset.map(card => {
              const decryptedCardNumber = CryptoJS.AES.decrypt(card.card_number, encryptionKey).toString(CryptoJS.enc.Utf8);
    
              return {
                cardHolder: card.card_holder,
                cardNumber: decryptedCardNumber,
                expiryDate: card.expiry_date,
                id: card.id,
              };
            });
    
            return cards;
          } else {
            throw new Error('No cards found');
          }
        } catch (error) {
          throw new Error('Error retrieving cards: ' + error.message);
        }
      }

      static async getCardById(cardId) {
        try {
          const pool = await DbConnection.getInstance().getConnection();
          const query = `
            SELECT id, card_holder, card_number, expiry_date, cvv, user_email 
            FROM payment
            WHERE id = @cardId AND active = 1
          `;
    
          const result = await pool.request()
            .input('cardId', sql.UniqueIdentifier, cardId)
            .query(query);
    
          if (result.recordset.length > 0) {
            const payment = result.recordset[0];
            const decryptedCardNumber = CryptoJS.AES.decrypt(payment.card_number, encryptionKey).toString(CryptoJS.enc.Utf8);
            const decryptedCvv = CryptoJS.AES.decrypt(payment.cvv, encryptionKey).toString(CryptoJS.enc.Utf8);
    
            return {
              id: payment.id,
              cardHolder: payment.card_holder,
              cardNumber: decryptedCardNumber,
              expiryDate: payment.expiry_date,
              cvv: decryptedCvv,
              userEmail: payment.user_email,
            };
          } else {
            throw new Error('Card not found');
          }
        } catch (error) {
          throw new Error('Error retrieving card details: ' + error.message);
        }
      }

      static async deleteCardById(cardId) {
        const pool = await DbConnection.getInstance().getConnection();
        const query = `
          DELETE FROM payment
          WHERE id = @cardId
        `;
    
        try {
          const result = await pool.request()
            .input('cardId', sql.UniqueIdentifier, cardId)
            .query(query);
    
          return result;
        } catch (error) {
          throw new Error('Error deleting card: ' + error.message);
        }
      }

      static async editCardById(cardId, cardDetails) {
        const {expiryDate, cvv } = cardDetails;
    
        const encryptedCvv = CryptoJS.AES.encrypt(cvv, encryptionKey).toString();
    
        const pool = await DbConnection.getInstance().getConnection();
        const query = `
          UPDATE payment
          SET expiry_date = @expiryDate,
              cvv = @cvv
          WHERE id = @cardId
        `;
    
        try {
          const result = await pool.request()
            .input('cardId', sql.UniqueIdentifier, cardId)
            .input('expiryDate', sql.NVarChar, expiryDate)
            .input('cvv', sql.NVarChar, encryptedCvv)
            .query(query);
    
          return result;
        } catch (error) {
          throw new Error('Error updating card details: ' + error.message);
        }
      }
    }
    




export default PaymentService;

