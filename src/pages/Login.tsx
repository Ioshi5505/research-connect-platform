import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Navbar } from "@/components/Navbar";
import { Alert, AlertDescription } from "@/components/ui/alert";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState("student");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      if (isSignUp) {
        console.log("Attempting signup with role:", role);
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              role: role,
            },
          },
        });

        if (error) {
          console.error("Signup error:", error);
          if (error.status === 429) {
            throw new Error("Пожалуйста, подождите минуту перед следующей попыткой регистрации");
          }
          throw error;
        }

        console.log("Signup successful:", data);
        if (data.user) {
          toast({
            title: "Успешно!",
            description: "Проверьте вашу почту для подтверждения регистрации",
          });
          setEmail("");
          setPassword("");
        }
      } else {
        console.log("Attempting login");
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          console.error("Login error:", error);
          throw error;
        }

        console.log("Login successful:", data);
        if (data.user) {
          toast({
            title: "Успешно!",
            description: "Вы вошли в систему",
          });
          navigate("/");
        }
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      let errorMessage = error.message;
      
      // Улучшенная обработка ошибок
      if (error.message.includes("Database error")) {
        errorMessage = "Ошибка при создании профиля. Пожалуйста, попробуйте еще раз.";
      } else if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Неверный email или пароль";
      }
      
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-md mx-auto mt-16 p-6 bg-card rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isSignUp ? "Регистрация" : "Вход"}
        </h1>
        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleAuth} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Введите email"
              disabled={isLoading}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Введите пароль"
              disabled={isLoading}
            />
          </div>

          {isSignUp && (
            <div className="space-y-2">
              <Label>Выберите роль</Label>
              <RadioGroup
                value={role}
                onValueChange={setRole}
                className="flex flex-col space-y-2"
                disabled={isLoading}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student">Студент</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="employee" id="employee" />
                  <Label htmlFor="employee">Сотрудник</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Загрузка..." : isSignUp ? "Зарегистрироваться" : "Войти"}
          </Button>
        </form>

        <div className="mt-4 text-center">
          <Button
            variant="link"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setError(null);
            }}
            className="text-primary"
            disabled={isLoading}
          >
            {isSignUp
              ? "Уже есть аккаунт? Войти"
              : "Нет аккаунта? Зарегистрироваться"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;