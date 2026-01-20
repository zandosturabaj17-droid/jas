import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Mail, Chrome, ArrowLeft, Lock, User as UserIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Регистрация по email и паролю
  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    // Проверка пароля
    if (password !== confirmPassword) {
      setError("Пароли не совпадают!");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Пароль должен быть не менее 6 символов!");
      setLoading(false);
      return;
    }

    try {
      // Регистрация в Supabase
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: window.location.origin,
        },
      });

      if (signUpError) throw signUpError;

      if (data?.user) {
        setMessage("✅ Регистрация успешна! Проверьте вашу почту для подтверждения.");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFullName("");
        
        // Переход на login через 3 секунды
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (err: any) {
      setError(err.message || "Ошибка при регистрации");
    } finally {
      setLoading(false);
    }
  };

  // Регистрация через Google
  const handleGoogleRegister = async () => {
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) throw error;
    } catch (err: any) {
      setError(err.message || "Ошибка при регистрации через Google");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#381932] via-[#5a2d5a] to-[#381932] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#d4a574] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFF3E6] rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card с регистрацией */}
        <Card className="bg-[#FFF3E6] border-2 border-[#381932] shadow-2xl">
          <CardHeader className="space-y-2 text-center">
            <div className="text-5xl font-black text-[#381932] mb-2">JAS</div>
            <CardTitle className="text-2xl font-bold text-[#381932]">
              Регистрация
            </CardTitle>
            <CardDescription className="text-base text-[#381932] font-semibold">
              Присоединитесь к JAS
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Успешное сообщение */}
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-100 border-2 border-green-400 text-green-700 px-4 py-3 rounded-lg font-semibold"
              >
                {message}
              </motion.div>
            )}

            {/* Сообщение об ошибке */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg font-semibold"
              >
                ❌ {error}
              </motion.div>
            )}

            {/* Форма регистрации */}
            <form onSubmit={handleEmailRegister} className="space-y-4">
              {/* Имя */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-[#381932] font-bold text-base">
                  Полное имя
                </Label>
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Ваше имя"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="border-2 border-[#381932] focus:border-[#d4a574] bg-white text-[#381932] placeholder:text-gray-400 h-12"
                  disabled={loading}
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#381932] font-bold text-base">
                  Email адрес
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-2 border-[#381932] focus:border-[#d4a574] bg-white text-[#381932] placeholder:text-gray-400 h-12"
                  disabled={loading}
                />
              </div>

              {/* Пароль */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#381932] font-bold text-base">
                  Пароль
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Минимум 6 символов"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-2 border-[#381932] focus:border-[#d4a574] bg-white text-[#381932] placeholder:text-gray-400 h-12"
                  disabled={loading}
                />
              </div>

              {/* Подтверждение пароля */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[#381932] font-bold text-base">
                  Подтвердите пароль
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Повторите пароль"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="border-2 border-[#381932] focus:border-[#d4a574] bg-white text-[#381932] placeholder:text-gray-400 h-12"
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                disabled={loading || !email || !password || !fullName}
                className="w-full bg-[#381932] hover:bg-[#5a2d5a] text-[#FFF3E6] font-bold h-12 text-base transition-all"
              >
                <UserIcon className="w-5 h-5 mr-2" />
                {loading ? "Регистрация..." : "Создать аккаунт"}
              </Button>
            </form>

            {/* Разделитель */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-[#381932]"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-[#FFF3E6] text-[#381932] font-bold">
                  или
                </span>
              </div>
            </div>

            {/* Google регистрация */}
            <Button
              type="button"
              onClick={handleGoogleRegister}
              disabled={loading}
              className="w-full bg-white hover:bg-gray-50 text-[#381932] font-bold h-12 text-base border-2 border-[#381932] transition-all"
            >
              <Chrome className="w-5 h-5 mr-2" />
              {loading ? "Перенаправление..." : "Регистрация через Google"}
            </Button>

            {/* Ссылки */}
            <div className="space-y-2 text-center pt-2">
              <p className="text-[#381932] font-semibold">
                Уже есть аккаунт?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-[#5a2d5a] hover:text-[#381932] font-bold underline transition-colors"
                >
                  Войти
                </button>
              </p>
              <button
                onClick={() => navigate("/")}
                className="text-[#381932] hover:text-[#5a2d5a] font-bold text-base transition-colors flex items-center justify-center gap-2 mx-auto"
              >
                <ArrowLeft className="w-4 h-4" />
                На главную
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Информация */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center text-[#FFF3E6] space-y-2"
        >
          <p className="font-semibold">
            🔒 Ваши данные защищены и хранятся в безопасности
          </p>
          <p className="text-sm opacity-90">
            Используется Supabase для надежного хранения данных
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
