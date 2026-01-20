import TelegramBot from 'node-telegram-bot-api';
import express from 'express';
import cors from 'cors';

// Telegram Bot Token
const TOKEN = '8525981745:AAGuSL3XUQooD0vhODIOJlRDzEJoIOShwjc';
const BOT_URL = process.env.BOT_URL || 'http://localhost:3001';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

// Express server
const app = express();
app.use(cors());
app.use(express.json());

// Инициализируем бот с polling для локальной разработки, без polling для Vercel
let bot;
if (IS_PRODUCTION) {
  // На продакшене используем webhook
  bot = new TelegramBot(TOKEN);
} else {
  // Локально используем polling
  bot = new TelegramBot(TOKEN, { polling: true });
}

// Хранилище заказов (в реальном приложении использовать БД)
const orders = new Map();

// Webhook для Telegram (если нужен в будущем)
app.post('/bot/webhook', async (req, res) => {
  const { update_id, message, callback_query } = req.body;
  
  try {
    if (message) {
      const chatId = message.chat.id;
      const text = message.text;

      if (text === '/start') {
        const welcomeMessage = `
👋 Добро пожаловать в JAS - сервис аренды консолей!

Я буду отправлять вам уведомления о ваших заказах.
Просто подтверждайте заказы нажимая кнопки ниже.
        `;
        await bot.sendMessage(chatId, welcomeMessage);
      }
    } else if (callback_query) {
      // Обработка нажатия кнопок
      await handleCallbackQuery(callback_query);
    }
    res.sendStatus(200);
  } catch (error) {
    console.error('Ошибка обработки webhook:', error);
    res.sendStatus(500);
  }
});

// Обработка текстовых сообщений (для локальной разработки)
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

// Функция для обработки callback кнопок
async function handleCallbackQuery(query) {
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
💰 <b>Стоимость (1 сутки):</b> ${order.price} ₽

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
💰 <b>Стоимость:</b> ${order.price} ₽

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
}

// Обработка callback кнопок (для локальной разработки)
bot.on('callback_query', handleCallbackQuery);

// API endpoint для отправки уведомления о новом заказе
app.post('/api/notify-order', async (req, res) => {
  try {
    const { 
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

    // Получаем список администраторов из переменной окружения
    const adminIdsStr = process.env.TELEGRAM_ADMIN_IDS || process.env.VITE_TELEGRAM_CHAT_ID;
    const adminIds = adminIdsStr.split(',').map(id => id.trim());

    // Сохраняем заказ
    orders.set(orderId, {
      adminIds,
      ...orderData,
      createdAt: new Date(),
      status: 'pending'
    });

    // Форматируем сообщение
    const message = `📦 <b>Новый заказ!</b>
━━━━━━━━━━━━━━━━━━━━━━━
<b>ID Заказа:</b> ${orderId}
<b>Консоль:</b> ${consoleName}
━━━━━━━━━━━━━━━━━━━━━━━
<b>👤 Клиент:</b> ${name}
<b>📞 Телефон:</b> ${phone}
<b>📍 Адрес доставки:</b> ${address}
━━━━━━━━━━━━━━━━━━━━━━━
<b>🚚 Тип доставки:</b> ${deliveryType === 'fast' ? 'СРОЧНО (2-3ч)' : 'ЗАПЛАНИРОВАННАЯ'}
<b>⏰ Время доставки:</b> ${deliveryTime}
━━━━━━━━━━━━━━━━━━━━━━━
<b>💰 Стоимость:</b> <code>${price} ₽</code>
━━━━━━━━━━━━━━━━━━━━━━━
✅ <i>Ожидает подтверждения</i>`;

    const keyboard = {
      inline_keyboard: [
        [
          { text: '✅ Подтвердить', callback_data: `confirm_${orderId}` },
          { text: '❌ Отклонить', callback_data: `reject_${orderId}` }
        ]
      ]
    };

    // Отправляем сообщение всем администраторам
    let successCount = 0;
    let errorCount = 0;

    for (const adminId of adminIds) {
      try {
        await bot.sendMessage(adminId, message, {
          parse_mode: 'HTML',
          reply_markup: keyboard
        });
        successCount++;
        console.log(`📨 Заказ #${orderId} отправлен администратору ${adminId}`);
      } catch (telegramError) {
        errorCount++;
        const errorMsg = telegramError instanceof Error ? telegramError.message : String(telegramError);
        console.error(`❌ Ошибка отправки админу ${adminId}:`, errorMsg);
      }
    }

    if (successCount > 0) {
      res.json({ success: true, message: `Уведомление отправлено ${successCount} администратор(ам)` });
    } else {
      res.status(500).json({ success: false, error: 'Не удалось отправить сообщение никому' });
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error('Ошибка при обработке заказа:', errorMsg);
    res.status(500).json({ success: false, error: errorMsg });
  }
});

// Обработка нажатий кнопок уже сделана выше

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
app.listen(PORT, async () => {
  console.log(`🤖 Telegram бот запущен на порту ${PORT}`);
  console.log(`📡 Токен: ${TOKEN}`);
  
  if (IS_PRODUCTION) {
    try {
      // Устанавливаем webhook на Vercel
      const webhookUrl = `${BOT_URL}/bot/webhook`;
      await bot.setWebHook(webhookUrl);
      console.log(`✅ Webhook установлен: ${webhookUrl}`);
    } catch (error) {
      console.error('❌ Ошибка установки webhook:', error);
    }
  } else {
    console.log(`✅ Используется polling для локальной разработки`);
  }
  console.log(`✅ Telegram бот инициализирован`);
});

// Экспорт для Vercel
export default app;
