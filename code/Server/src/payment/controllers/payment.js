// controllers/stripeController.js
import Stripe from 'stripe';
import PaymentService from '../services/payment.js'
import generateInvoice from '../../utils/generateInvoice.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sql from 'mssql';
import DbConnection from "../../config/dbconnection.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Cargar la clave secreta desde las variables de entorno
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export class ReservationsController {
  // Método para crear un intento de pago
  static async createPaymentIntent(req, res) {
    const { amount } = req.body;
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd',
      });
      res.status(200).send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  static async addPayment(req, res) {
    try {
      const cardDetails = req.body;
      const result = await PaymentService.saveCardDetails(cardDetails);
      res.status(200).send({ message: 'Payment details saved successfully', result });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  static async getPayment(req, res) {
    try {
      const result = await PaymentService.getPayment();
      res.status(200).send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  }

  static async createBilling(req, res) {
    const { reservationId, total, checkIn, checkOut, id_services, num_room, userEmail } = req.body;

    // Crear la estructura de la factura
    const invoice = {
      shipping: {
        name: userEmail, 
        address: 'N/A',  
        city: 'Jaco',     
        state: 'Puntarenas',   
        country: 'Costa Rica',  
        postal_code: '61101' 
      },
      items: [
        {
          item: `Room ${num_room}`,
          description: `Services: ${id_services}`,
          amount: total,
          quantity: 1
        }
      ],
      subtotal: total,
      paid: total,
      invoice_nr: reservationId,
      checkIn: checkIn,
      checkOut: checkOut
    };
  
    // Ruta del directorio y del archivo
    const invoicesDir = path.join(__dirname, '../../invoices');
    const filePath = path.join(invoicesDir, `${reservationId}.pdf`);
  
    // Crear el directorio si no existe
    if (!fs.existsSync(invoicesDir)) {
      fs.mkdirSync(invoicesDir, { recursive: true });
    }
  
    // Generar la factura
    const writeStream = fs.createWriteStream(filePath);
    generateInvoice(invoice, writeStream);
  
    writeStream.on('finish', async () => {
      // Leer el archivo generado y convertirlo a binario
      const invoiceBinary = fs.readFileSync(filePath);
  
      // Guardar la factura en la base de datos
      const pool = await DbConnection.getInstance().getConnection();
      const query = `
        INSERT INTO payment_bills (reservationId, userEmail, invoice)
        VALUES (@reservationId, @userEmail, @invoice)
      `;
  
      try {
        await pool.request()
          .input('reservationId', sql.UniqueIdentifier, reservationId)
          .input('userEmail', sql.NVarChar, userEmail)
          .input('invoice', sql.VarBinary, invoiceBinary)
          .query(query);
  
        res.status(200).send({ message: 'Payment successful and invoice saved.' });
      } catch (error) {
        res.status(500).send({ error: 'Error saving the invoice: ' + error.message });
      }
    });
  
    writeStream.on('error', (error) => {
      res.status(500).send({ error: 'Error generating the invoice: ' + error.message });
    });
  }

    static async getInvoice(req, res) {
      const { reservationId } = req.params;

  // Obtener la factura desde la base de datos
  const pool = await DbConnection.getInstance().getConnection();
  const query = `
    SELECT invoice
    FROM payment_bills
    WHERE reservationId = @reservationId
  `;

  try {
    const result = await pool.request()
      .input('reservationId', sql.UniqueIdentifier, reservationId)
      .query(query);

    if (result.recordset.length > 0) {
      const invoice = result.recordset[0].invoice;

      // Configurar la respuesta para descargar el archivo PDF
      res.setHeader('Content-Disposition', `attachment; filename=${reservationId}.pdf`);
      res.setHeader('Content-Type', 'application/pdf');
      res.send(invoice);
    } else {
      res.status(404).send({ error: 'Invoice not found' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Error retrieving the invoice: ' + error.message });
  }
};

static async getCards(req, res) {
  const { userEmail } = req.params;

  try {
    const cards = await PaymentService.getCards(userEmail);
    res.status(200).send(cards);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
static async getCardById(req, res) {
  const { cardId } = req.params;
  try {
    const cardDetails = await PaymentService.getCardById(cardId);
    res.status(200).send(cardDetails);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

static async deleteCardById(req, res) {
  const { cardId } = req.params;

  try {
    const result = await PaymentService.deleteCardById(cardId);
    if (result.rowsAffected[0] > 0) {
      res.status(200).send({ message: 'Card deleted successfully' });
    } else {
      res.status(404).send({ error: 'Card not found' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Error deleting card: ' + error.message });
  }
}
static async editCardById(req, res) {
  const { cardId } = req.params;
  const { expiryDate, cvv } = req.body;

  try {
    const result = await PaymentService.editCardById(cardId, { expiryDate, cvv });
    if (result.rowsAffected[0] > 0) {
      res.status(200).send({ message: 'Card details updated successfully' });
    } else {
      res.status(404).send({ error: 'Card not found' });
    }
  } catch (error) {
    res.status(500).send({ error: 'Error updating card details: ' + error.message });
  }
}
};
export default ReservationsController;



