import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, X } from "lucide-react";

export const AuthModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setMessage("Ошибка: " + error.message);
      } else {
        setMessage("Проверьте ваш email для ссылки входа");
        setEmail("");
      }
    } catch (err) {
      setMessage("Ошибка при входе");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setMessage("Ошибка: " + error.message);
      }
    } catch (err) {
      setMessage("Ошибка при входе через Google");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-2xl shadow-2xl w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full transition-colors"
        >
          <X className="h-5 w-5 text-muted-foreground" />
        </button>

        <div className="p-8 pt-12">
          <h2 className="text-3xl font-bold mb-8 text-center">Вход</h2>

          {/* Email login */}
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-4 font-medium">По электронной почте</p>
            <form onSubmit={handleEmailSignIn} className="space-y-3">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
                className="rounded-lg"
              />
              <Button 
                type="submit" 
                disabled={loading} 
                className="w-full rounded-lg h-10"
              >
                <Mail className="h-4 w-4 mr-2" />
                {loading ? "Загрузка..." : "Отправить ссылку"}
              </Button>
            </form>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-background text-muted-foreground">или</span>
            </div>
          </div>

          {/* Google login */}
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-4 font-medium">Через Google</p>
            <Button
              onClick={handleGoogleSignIn}
              disabled={loading}
              variant="outline"
              className="w-full rounded-lg h-10"
            >
              <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {loading ? "Загрузка..." : "Google"}
            </Button>
          </div>

          {/* Message */}
          {message && (
            <div className={`p-3 rounded-lg text-sm text-center ${
              message.includes("Проверьте") 
                ? "bg-green-500/10 text-green-700 border border-green-200" 
                : "bg-red-500/10 text-red-700 border border-red-200"
            }`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
