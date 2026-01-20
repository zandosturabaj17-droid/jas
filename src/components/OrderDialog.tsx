import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Clock, MapPin, FileText } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface OrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consoleName: string;
  price: number;
}

type DeliveryOption = "asap" | "schedule";
type TimeSelectType = "preset" | "custom";

const OrderDialog = ({ open, onOpenChange, consoleName, price }: OrderDialogProps) => {
  const { toast } = useToast();
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption>("asap");
  const [selectedDate, setSelectedDate] = useState("");
  const [timeSelectType, setTimeSelectType] = useState<TimeSelectType>("preset");
  const [customTime, setCustomTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);

  const timeSlots = {
    morning: { label: "09:00 - 12:00 (Утро)", time: "09:00" },
    afternoon: { label: "12:00 - 17:00 (Полдень)", time: "12:00" },
    evening: { label: "17:00 - 21:00 (Вечер)", time: "17:00" },
  };
  // Функция для проверки статуса заказа
  const startPollingOrderStatus = (orderId: string) => {
    setCurrentOrderId(orderId);
    
    const interval = setInterval(async () => {
      try {
        const botUrl = window.location.hostname === 'localhost' 
          ? `http://localhost:3001/api/order-status/${orderId}`
          : `http://${window.location.hostname}:3001/api/order-status/${orderId}`;
        
        const response = await fetch(botUrl);
        const data = await response.json();
        
        if (data.status === 'confirmed') {
          clearInterval(interval);
          setPollingInterval(null);
          
          toast({
            title: "✅ Заказ подтвержден!",
            description: `Заказ #${orderId} был успешно подтвержден менеджером.`,
          });
          
          // Закрываем диалог через 2 секунды
          setTimeout(() => {
            onOpenChange(false);
          }, 2000);
        } else if (data.status === 'rejected') {
          clearInterval(interval);
          setPollingInterval(null);
          
          toast({
            title: "❌ Заказ отклонен",
            description: `Заказ #${orderId} был отклонен. Пожалуйста, попробуйте позже.`,
            variant: "destructive",
          });
          
          setTimeout(() => {
            onOpenChange(false);
          }, 2000);
        }
      } catch (error) {
        console.error('Ошибка при проверке статуса:', error);
      }
    }, 2000); // Проверяем каждые 2 секунды
    
    setPollingInterval(interval);
  };

  // Очистка при закрытии диалога
  useEffect(() => {
    if (!open && pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
      setCurrentOrderId(null);
    }
  }, [open, pollingInterval]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!agreedToTerms) {
      alert("Пожалуйста, согласитесь с условиями договора");
      return;
    }

    setLoading(true);

    let deliveryTime = "";
    if (deliveryOption === "schedule") {
      if (timeSelectType === "preset") {
        deliveryTime = customTime;
      } else {
        deliveryTime = customTime;
      }
    }

    const orderId = `ORD-${Date.now()}`;
    const orderData = {
      console: consoleName,
      deliveryType: deliveryOption === "asap" ? "fast" : "scheduled",
      deliveryTime: deliveryTime || "ASAP",
      address,
      name,
      phone,
      price,
      agreedToTerms,
    };
    
    try {
      // Отправляем уведомление в Telegram бот
      const botUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:3001/api/notify-order'
        : `http://${window.location.hostname}:3001/api/notify-order`;
      
      console.log('Отправка заказа на:', botUrl);
      console.log('Данные заказа:', { userId: 830161178, orderData, orderId });
      
      const response = await fetch(botUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 830161178, // ID @Voydeh
          orderData,
          orderId
        })
      });

      console.log('Статус ответа:', response.status, response.statusText);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      
      console.log("✅ Заказ отправлен в Telegram:", result);
      
      toast({
        title: "✅ Заказ отправлен!",
        description: "Ожидаем подтверждения от менеджера...",
      });
      
      // Начинаем polling для проверки статуса
      startPollingOrderStatus(orderId);
      
      // Очистка формы
      setName("");
      setPhone("");
      setAddress("");
      setSelectedDate("");
      setCustomTime("");
      setAgreedToTerms(false);
    } catch (error: any) {
      console.error("Ошибка при создании заказа:", error);
      console.error("Детали ошибки:", error.message, error.stack);
      
      // Обработка специальных ошибок
      let errorMessage = error.message;
      if (errorMessage.includes('chat not found') || errorMessage.includes('Чат не найден')) {
        alert(
          "❌ Бот не может отправить вам уведомление.\n\n" +
          "Решение:\n" +
          "1. Откройте Telegram\n" +
          "2. Найдите бота по токену: 8525981745:AAGuSL3XUQooD0vhODIOJlRDzEJoIOShwjc\n" +
          "3. Нажмите кнопку START или напишите /start\n" +
          "4. Вернитесь на сайт и попробуйте заказать снова"
        );
      } else {
        alert(`❌ Ошибка: ${errorMessage}\n\nПроверьте консоль браузера (F12 → Console)`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Получить минимальную дату (сегодня)
  const today = new Date().toISOString().split("T")[0];
  
  const isFormValid = name && phone && address && agreedToTerms && 
    (deliveryOption === "asap" || (selectedDate && customTime));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Заказ {consoleName}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Выбор способа доставки */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            <Label className="text-base font-semibold">Когда вам удобно?</Label>
            <RadioGroup value={deliveryOption} onValueChange={(value) => setDeliveryOption(value as DeliveryOption)}>
              <motion.div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-secondary/50 cursor-pointer transition-colors"
                whileHover={{ x: 4 }}
              >
                <RadioGroupItem value="asap" id="asap" />
                <Label htmlFor="asap" className="flex-1 cursor-pointer font-medium">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gold" />
                    Чем скорее!
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Доставка в течение 2-3 часов</p>
                </Label>
              </motion.div>

              <motion.div className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-secondary/50 cursor-pointer transition-colors"
                whileHover={{ x: 4 }}
              >
                <RadioGroupItem value="schedule" id="schedule" />
                <Label htmlFor="schedule" className="flex-1 cursor-pointer font-medium">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gold" />
                    Выбрать удобное время
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Доставка в выбранное время</p>
                </Label>
              </motion.div>
            </RadioGroup>
          </motion.div>

          {/* Выбор даты и времени */}
          {deliveryOption === "schedule" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4 p-4 bg-secondary/30 rounded-lg"
            >
              <div>
                <Label htmlFor="date" className="text-sm font-medium">
                  Выберите дату
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={today}
                  required={deliveryOption === "schedule"}
                  className="mt-2"
                />
              </div>

              <div>
                <Label className="text-sm font-medium mb-3 block">Выберите способ указания времени</Label>
                <RadioGroup value={timeSelectType} onValueChange={(value) => setTimeSelectType(value as TimeSelectType)}>
                  <motion.div className="flex items-center space-x-3 p-2 rounded border border-border hover:bg-secondary/50 cursor-pointer"
                    whileHover={{ x: 2 }}
                  >
                    <RadioGroupItem value="preset" id="preset" />
                    <Label htmlFor="preset" className="cursor-pointer flex-1">
                      Выбрать из предложенных интервалов
                    </Label>
                  </motion.div>

                  <motion.div className="flex items-center space-x-3 p-2 rounded border border-border hover:bg-secondary/50 cursor-pointer"
                    whileHover={{ x: 2 }}
                  >
                    <RadioGroupItem value="custom" id="custom" />
                    <Label htmlFor="custom" className="cursor-pointer flex-1">
                      Указать собственное время
                    </Label>
                  </motion.div>
                </RadioGroup>
              </div>

              {timeSelectType === "preset" ? (
                <div>
                  <Label className="text-sm font-medium mb-3 block">Интервалы доставки</Label>
                  <RadioGroup value={customTime} onValueChange={setCustomTime}>
                    <div className="space-y-2">
                      {Object.entries(timeSlots).map(([key, { label, time }]) => (
                        <motion.div
                          key={key}
                          className="flex items-center space-x-3 p-2 rounded border border-border hover:bg-secondary/50 cursor-pointer"
                          whileHover={{ x: 2 }}
                        >
                          <RadioGroupItem value={time} id={`time-${key}`} />
                          <Label htmlFor={`time-${key}`} className="cursor-pointer flex-1">
                            {label}
                          </Label>
                        </motion.div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              ) : (
                <div>
                  <Label htmlFor="customTime" className="text-sm font-medium">
                    Укажите точное время (ЧЧ:ММ)
                  </Label>
                  <Input
                    id="customTime"
                    type="time"
                    value={customTime}
                    onChange={(e) => setCustomTime(e.target.value)}
                    required={timeSelectType === "custom" && deliveryOption === "schedule"}
                    className="mt-2"
                  />
                  {customTime && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Время доставки: {customTime}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* Адрес доставки */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <Label htmlFor="address" className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gold" />
              Адрес доставки
            </Label>
            <Textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Ул. Абая, 155, кв. 42, Алматы, 050000"
              required
              className="mt-2 resize-none"
              rows={3}
            />
          </motion.div>

          {/* Контактная информация */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-3"
          >
            <div>
              <Label htmlFor="name" className="text-sm">
                Ваше имя
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Иван Петров"
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-sm">
                Номер телефона
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+7 (999) 123-45-67"
                required
                className="mt-2"
              />
            </div>
          </motion.div>

          {/* Согласие с договором */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 bg-secondary/30 rounded-lg border border-border"
          >
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <Label htmlFor="terms" className="cursor-pointer text-sm leading-relaxed flex items-start gap-2">
                <FileText className="h-4 w-4 text-gold mt-0.5 flex-shrink-0" />
                <span>
                  Я согласен с условиями договора аренды и подтверждаю, что ознакомился с правилами безопасности и ухода за оборудованием
                </span>
              </Label>
            </div>
          </motion.div>

          {/* Сумма */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="p-4 bg-gold/10 rounded-lg border border-gold/20"
          >
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Стоимость аренды (1 сутки):</span>
              <span className="text-2xl font-bold text-gold">{price.toLocaleString()}₸</span>
            </div>
          </motion.div>

          {/* Кнопки */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-3"
          >
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Отмена
            </Button>
            <Button
              type="submit"
              variant="gold"
              className="flex-1"
              disabled={!isFormValid || loading}
            >
              {loading ? "Отправка..." : "Подтвердить заказ"}
            </Button>
          </motion.div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;
