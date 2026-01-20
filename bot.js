import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import cors from 'cors';

// Telegram Bot Token
const TOKEN = '8525981745:AAGuSL3XUQooD0vhODIOJlRDzEJoIOShwjc';

// Используем polling для разработки
const bot = new TelegramBot(TOKEN, { polling: true });

// Express server
const app = express();
app.use(cors());
app.use(express.json());

// Хранилище заказов
const orders = new Map();

// Webhook для Telegram (если нужен в будущем)
app.post('/bot/webhook', (req, res) => {
  res.sendStatus(200);
});

// Обработка текстовых сообщений
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === '/start') {
    const welcomeMessage = `
👋 Добро пожаловать в JAS - сервис аренды консолей!

Я буду отправлять вам уведомления о ваших заказах.
Просто подтверждайте заказы нажимая кнопки ниже.
    `;
    bot.sendMessage(chatId, welcomeMessage);
  }
});

// API endpoint для отправки уведомления о новом заказе
app.post('/api/notify-order', async (req, res) => {
  try {
    const { 
      userId, 
      orderData, 
      orderId 
    } = req.body;

    const {
      console: consoleName,
      deliveryType,
      deliveryTime,
      address,
      name,
      phone,
      price
    } = orderData;

    // Сохраняем заказ
    orders.set(orderId, {
      userId,
      ...orderData,
      createdAt: new Date(),
      status: 'pending'
    });

    // Форматируем сообщение
    const message = `
📱 <b>Новый заказ!</b>

🎮 <b>Консоль:</b> ${consoleName}
💰 <b>Стоимость (1 сутки):</b> ${price} ₸

📍 <b>Доставка:</b> ${deliveryType === 'fast' ? '⚡ Срочная (2-3 часа)' : '🕐 В выбранное время'}
${deliveryType !== 'fast' ? `⏰ <b>Время:</b> ${deliveryTime}` : ''}

📬 <b>Адрес:</b>
${address}

👤 <b>Имя:</b> ${name}
📞 <b>Телефон:</b> ${phone}

<b>Номер заказа:</b> #${orderId}
    `;

    const keyboard = {
      inline_keyboard: [
        [
          { text: '✅ Подтвердить', callback_data: `confirm_${orderId}` },
          { text: '❌ Отклонить', callback_data: `reject_${orderId}` }
        ]
      ]
    };

    try {
      // Отправляем сообщение пользователю
      await bot.sendMessage(userId, message, {
        parse_mode: 'HTML',
        reply_markup: keyboard
      });
      
      console.log(`📨 Заказ #${orderId} отправлен пользователю ${userId}`);
      res.json({ success: true, message: 'Уведомление отправлено' });
    } catch (telegramError) {
      const errorMsg = telegramError instanceof Error ? telegramError.message : String(telegramError);
      console.error(`❌ Ошибка Telegram (${userId}):`, errorMsg);
      
      // Если чат не найден - даём пользователю инструкцию
      if (errorMsg.includes('chat not found')) {
        res.status(400).json({ 
          success: false, 
          error: 'Чат не найден. Напишите /start боту @JasRentalBot чтобы начать получать уведомления.',
          userId
        });
      } else {
        res.status(500).json({ success: false, error: errorMsg });
      }
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('Ошибка при обработке заказа:', errorMsg);
    res.status(500).json({ success: false, error: errorMsg });
  }
});

// Обработка нажатий кнопок
bot.on('callback_query', async (query) => {
  const data = query.data;
  const chatId = query.message.chat.id;
  const messageId = query.message.message_id;

  try {
    if (data.startsWith('confirm_')) {
      const orderId = data.replace('confirm_', '');
      const order = orders.get(orderId);

      if (order) {
        orders.set(orderId, { ...order, status: 'confirmed' });

        // Формируем сообщение с полными деталями заказа
        const confirmMessage = `
✅ <b>Заказ подтвержден!</b>

📱 <b>Заказ:</b> #${orderId}
🎮 <b>Консоль:</b> ${order.console}
💰 <b>Стоимость (1 сутки):</b> ${order.price} ₸

📍 <b>Доставка:</b> ${order.deliveryType === 'fast' ? '⚡ Срочная (2-3 часа)' : '🕐 В выбранное время'}
${order.deliveryType !== 'fast' ? `⏰ <b>Время:</b> ${order.deliveryTime}` : ''}

📬 <b>Адрес доставки:</b>
${order.address}

👤 <b>Клиент:</b> ${order.name}
📞 <b>Телефон:</b> ${order.phone}

✅ Спасибо за доверие! 🎮
        `;

        // Ответ пользователю в Telegram
        await bot.editMessageText(
          confirmMessage,
          {
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'HTML'
          }
        );

        console.log(`✅ Заказ #${orderId} подтвержден`);
      }
    } else if (data.startsWith('reject_')) {
      const orderId = data.replace('reject_', '');
      const order = orders.get(orderId);

      if (order) {
        orders.set(orderId, { ...order, status: 'rejected' });

        // Формируем сообщение с деталями отклоненного заказа
        const rejectMessage = `
❌ <b>Заказ отклонен</b>

📱 <b>Заказ:</b> #${orderId}
🎮 <b>Консоль:</b> ${order.console}
💰 <b>Стоимость:</b> ${order.price} ₸

👤 <b>Клиент:</b> ${order.name}
📞 <b>Телефон:</b> ${order.phone}

❌ Заказ был отклонен. Пожалуйста, свяжитесь с клиентом.
        `;

        await bot.editMessageText(
          rejectMessage,
          {
            chat_id: chatId,
            message_id: messageId,
            parse_mode: 'HTML'
          }
        );

        console.log(`❌ Заказ #${orderId} отклонен`);
      }
    }

    await bot.answerCallbackQuery(query.id);
  } catch (error) {
    console.error('Ошибка при обработке кнопки:', error);
    await bot.answerCallbackQuery(query.id, { text: 'Ошибка обработки' });
  }
});

// Endpoint для получения статуса заказа
app.get('/api/order-status/:orderId', (req, res) => {
  const { orderId } = req.params;
  const order = orders.get(orderId);

  if (!order) {
    return res.status(404).json({ error: 'Заказ не найден' });
  }

  res.json({ orderId, status: order.status });
});

// Запуск сервера
const PORT = process.env.BOT_PORT || 3001;
app.listen(PORT, () => {
  console.log(`🤖 Telegram бот запущен на порту ${PORT}`);
  console.log(`📡 Токен: ${TOKEN}`);
  console.log(`✅ Webhook готов к получению сообщений`);
});

console.log('✅ Telegram бот инициализирован');
