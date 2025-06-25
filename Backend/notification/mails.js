import { sendEmail } from "../config/mailer.js";
import {getNotifiableAdmin, getNotifiableUsers} from "../notification/notifi_user.js"

export const notifyNewProduct = async (product) => {
    const subject = `🛍️ New Product Added: ${product.name}`;
    const html = `
      <h2>New Product Alert: ${product.name}</h2>
      <p><strong>Description:</strong> ${product.description}</p>
      <p><strong>Price:</strong> $${product.price}</p>
      <img src="${product.image_url}" alt="${product.name}" style="width:300px; border-radius:10px; margin-top:10px;">
      <p><a href="https://your-website.com/products/${product.id}" style="color: white; background-color: #007bff; padding: 10px 15px; text-decoration: none; border-radius: 5px;">View Product</a></p>
    `;
  
    try {
      const emails = await getNotifiableUsers();
  
      for (const email of emails) {
        await sendEmail(email, subject, '', html);
      }
  
      console.log('✅ Notification sent to all subscribed users.');
    } catch (error) {
      console.error('❌ Error sending notifications:', error.message);
    }
  };

  export const notifyNewOffers = async (offer) => {
    const subject = `🎉 New Offer Just Dropped: ${offer.title}`;
    const html = `
  <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: auto;">
    <h2 style="color: #ff6f00;">🎉 Just for You: ${offer.title}</h2>
    
    <p style="font-size: 16px;">We're excited to bring you an exclusive offer! Here's what you need to know:</p>
    
    <table style="width: 100%; background-color: #f9f9f9; padding: 15px; border-radius: 10px; margin: 20px 0;">
      <tr>
        <td><strong>💰 Special Price:</strong></td>
        <td>$${offer.price}</td>
      </tr>
      <tr>
        <td><strong>📅 Starts:</strong></td>
        <td>${offer.start_date}</td>
      </tr>
      <tr>
        <td><strong>⏳ Ends:</strong></td>
        <td>${offer.end_date}</td>
      </tr>
    </table>

    <p>${offer.description}</p>

    <img src="${offer.image_url}" alt="Special Offer" 
         style="width: 100%; max-width: 500px; border-radius: 10px; margin: 20px 0;">

    <p style="text-align: center;">
      <a href="https://your-website.com/offers" 
         style="background-color: #ff6f00; color: white; padding: 12px 25px; text-decoration: none; 
                border-radius: 5px; font-weight: bold; display: inline-block;">
        👉 Claim Your Deal Now
      </a>
    </p>

    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

    <p style="font-size: 14px; color: #777;">You’re receiving this because you signed up at <strong>Saara’s Sips & Bites</strong>. 
    Offers like this don’t come often — don’t miss out!</p>

    <p style="font-size: 12px; color: #aaa;">
      Need help? <a href="mailto:support@your-website.com">Contact support</a> anytime.
    </p>
  </div>
`;
    
  
    try {
      const emails = await getNotifiableUsers();
  
      for (const email of emails) {
        await sendEmail(email, subject, '', html);
      }
  
      console.log('✅ Notification sent to all subscribed users.');
    } catch (error) {
      console.error('❌ Error sending notifications:', error.message);
    }
  };

   export const notifyOrderCompleted = async (order) => {
   const subject = `✅ Order #${order.order_id} Completed – Thank You!`;
const html =`
  <div style="font-family: 'Segoe UI', sans-serif; color: #333; max-width: 600px; margin: auto; line-height: 1.6;">
    <h2 style="color: #28a745;">✅ Your Order is Complete!</h2>

    <p>Hi <strong>${order.userName}</strong>,</p>

    <p>Thank you for ordering with <strong>Saara’s Sips & Bites</strong>! 🥤🍰</p>
    
    <p>Your order <strong>#${order.order_id}</strong> was successfully completed. We hope everything was delicious and just how you wanted it!</p>

    <table style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <tr>
        <td><strong>🧾 Order ID:</strong></td>
        <td>#${order.order_id}</td>
      </tr>
      <tr>
        <td><strong>💳 Total Paid:</strong></td>
        <td>$${order.totalPrice}</td>
      </tr>
    </table>

    <p style="font-size: 16px;">We'd love to hear what you thought — your feedback means the world to us! 😋</p>

    <img src="https://your-website.com/thank-you.jpg" alt="Thank You" 
         style="width: 100%; max-width: 450px; border-radius: 10px; margin: 20px 0; display: block;">

    <p style="text-align: center;">
      <a href="https://your-website.com/review/${order.order_id}" 
         style="background-color: #17a2b8; color: white; padding: 12px 25px; text-decoration: none; 
                border-radius: 5px; font-weight: bold; display: inline-block;">
        ✍️ Leave a Review
      </a>
    </p>

    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">

    <p style="font-size: 14px; color: #888;">
      Need help with your order? 
      <a href="mailto:support@your-website.com" style="color: #17a2b8;">Contact us</a> anytime.
    </p>
  </div>
`;
    
  
    try {
      const email = order.userEmail;
      await sendEmail(email, subject, '', html);
      console.log('✅ Notification sent to user.');
    } catch (error) {
      console.error('❌ Error sending notifications:', error.message);
    }
  };

   export const notifyNewOrderUser = async (order) => {
    const subject = `🧾 Order Confirmation - Order #${order.id}`;
    const html = `
      <h2>Thank You for Your Order, ${order.user_name}!</h2>
      <p>We've received your order <strong>#${order.id}</strong> and it's being prepared with love. ❤️</p>
      <p><strong>Order Summary:</strong></p>
      <ul>
        ${order.items.map(item => `<li>${item.quantity}x ${item.name} - $${item.price}</li>`).join('')}
      </ul>
      <p><strong>Total:</strong> $${order.total}</p>
      <p>We'll notify you once your order is on its way!</p>
      <img src="https://your-website.com/order-confirmation.jpg" alt="Order Placed" style="width:300px; border-radius:10px; margin-top:10px;">
      <p><a href="https://your-website.com/orders/${order.id}" style="color: white; background-color: #007bff; padding: 10px 15px; text-decoration: none; border-radius: 5px;">View Order Status</a></p>
    `;

    
  
    try {
      const email = order.user_email;
      await sendEmail(email, subject, '', html);

  
      console.log('✅ Notification sent to user.');
    } catch (error) {
      console.error('❌ Error sending notifications:', error.message);
    }
  };

   export const notifyNewOrderAdmin = async (order) => {
    const subject = `🛒 New Order Placed: Order #${order.id}`;
    const html = `
      <h2>New Order Received</h2>
      <p><strong>Customer:</strong> ${order.user_name}</p>
      <p><strong>Email:</strong> ${order.user_email}</p>
      <p><strong>Order ID:</strong> #${order.id}</p>
      <p><strong>Total:</strong> $${order.total}</p>
      <ul>
        ${order.items.map(item => `<li>${item.quantity}x ${item.name} - $${item.price}</li>`).join('')}
      </ul>
      <p><a href="https://your-website.com/admin/orders/${order.id}" style="color: white; background-color: #6f42c1; padding: 10px 15px; text-decoration: none; border-radius: 5px;">View Order</a></p>
    `;

    
  
    try {
      const emails = await getNotifiableAdmin();
  
      for (const email of emails) {
        await sendEmail(email, subject, '', html);
      }
  
      console.log('✅ Notification sent to all admins.');
    } catch (error) {
      console.error('❌ Error sending notifications:', error.message);
    }
  };

  export const notifyNewUser = async (user) => {
  const subject = `👋 Welcome to SAARA'S CAFE!`;
  const html = `
  <h2>Welcome Aboard, ${user.name}!</h2>
  <p>We're thrilled to have you join the <strong>Saara’s Sips & Bites</strong> community. 🥂</p>
  <p>Explore delicious bites and refreshing sips anytime, anywhere.</p>
  <img src="https://your-website.com/welcome-image.jpg" alt="Welcome" style="width:300px; border-radius:10px; margin-top:10px;">
  <p><a href="https://your-website.com/menu" style="color: white; background-color: #28a745; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Explore Our Menu</a></p>
`;
  
    try {
    const email = user.userEmail;
    await sendEmail(email, subject, '', html);
      console.log('✅ Notification sent to user.');
    } catch (error) {
      console.error('❌ Error sending notifications:', error.message);
    }
  };

  export const notifyNewOfferOrderAdmin = async (offer_order) => {
    const subject = `🛒 New Order Placed: Order #${order.id}`;
    const html = `
      <h2>New Order Received</h2>
      <p><strong>Customer:</strong> ${order.user_name}</p>
      <p><strong>Email:</strong> ${order.user_email}</p>
      <p><strong>Order ID:</strong> #${order.id}</p>
      <p><strong>Total:</strong> $${order.total}</p>
      <ul>
        ${order.items.map(item => `<li>${item.quantity}x ${item.name} - $${item.price}</li>`).join('')}
      </ul>
      <p><a href="https://your-website.com/admin/orders/${order.id}" style="color: white; background-color: #6f42c1; padding: 10px 15px; text-decoration: none; border-radius: 5px;">View Order</a></p>
    `;

    
  
    try {
      const emails = await getNotifiableAdmin();
  
      for (const email of emails) {
        await sendEmail(email, subject, '', html);
      }
  
      console.log('✅ Notification sent to all admins.');
    } catch (error) {
      console.error('❌ Error sending notifications:', error.message);
    }
  };

