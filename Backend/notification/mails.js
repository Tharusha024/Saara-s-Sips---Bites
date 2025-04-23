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
      <h2>Special Offer: ${offer.title}</h2>
      <p>${offer.description}</p>
      <p><strong>Valid Until:</strong> ${offer.valid_until}</p>
      <img src="${offer.image_url}" alt="Offer Banner" style="width:300px; border-radius:10px; margin-top:10px;">
      <p><a href="https://your-website.com/offers" style="color: white; background-color: #ffc107; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Grab the Deal</a></p>
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
const html = `
  <h2>Your Order is Complete!</h2>
  <p>Hi ${order.userName},</p>
  <p>Your order <strong>#${order.order_id}</strong> has been successfully completed. We hope you enjoyed it!</p>
  <p><strong>Total:</strong> $${order.totalPrice}</p>
  <p>We'd love to hear your feedback. 😋</p>
  <img src="https://your-website.com/thank-you.jpg" alt="Thank You" style="width:300px; border-radius:10px; margin-top:10px;">
  <p><a href="https://your-website.com/review/${order.order_id}" style="color: white; background-color: #17a2b8; padding: 10px 15px; text-decoration: none; border-radius: 5px;">Leave a Review</a></p>
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
