import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Mail, Chrome, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Вход по email (OTP)
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: window.location.origin,
        },
      });

      if (error) throw error;

      setMessage("✅ Проверьте вашу почту для подтверждения входа!");
      setEmail("");
    } catch (err: any) {
      setError(err.message || "Ошибка при входе");
    } finally {
      setLoading(false);
    }
  };

  // Вход через Google
  const handleGoogleLogin = async () => {
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
      setError(err.message || "Ошибка при входе через Google");
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
        {/* Card с входом */}
        <Card className="bg-[#FFF3E6] border-2 border-[#381932] shadow-2xl">
          <CardHeader className="space-y-2 text-center">
            <div className="text-5xl font-black text-[#381932] mb-2">JAS</div>
            <CardTitle className="text-2xl font-bold text-[#381932]">
              Вход на сайт
            </CardTitle>
            <CardDescription className="text-base text-[#381932] font-semibold">
              Сервис аренды консолей PlayStation
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

            {/* Email вход */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
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

              <Button
                type="submit"
                disabled={loading || !email}
                className="w-full bg-[#381932] hover:bg-[#5a2d5a] text-[#FFF3E6] font-bold h-12 text-base transition-all"
              >
                <Mail className="w-5 h-5 mr-2" />
                {loading ? "Отправка ссылки..." : "Войти по Email"}
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

            {/* Google вход */}
            <Button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full bg-white hover:bg-gray-50 text-[#381932] font-bold h-12 text-base border-2 border-[#381932] transition-all"
            >
              <Chrome className="w-5 h-5 mr-2" />
              {loading ? "Перенаправление..." : "Войти через Google"}
            </Button>

            {/* Ссылки */}
            <div className="space-y-2 text-center pt-2">
              <p className="text-[#381932] font-semibold">
                Нет аккаунта?{" "}
                <button
                  onClick={() => navigate("/register")}
                  className="text-[#5a2d5a] hover:text-[#381932] font-bold underline transition-colors"
                >
                  Зарегистрироваться
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
            📧 После входа по email вам придет ссылка для подтверждения
          </p>
          <p className="text-sm opacity-90">
            Ссылка будет действительна 24 часа
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
