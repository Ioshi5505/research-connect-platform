import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AuthError } from "@supabase/supabase-js";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<'student' | 'employee'>('student');

  useEffect(() => {
    console.log("Setting up auth state change listener");
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session);
        if (event === "SIGNED_IN" && session) {
          console.log("User signed in successfully, navigating to home");
          navigate("/");
        }
        if (event === "SIGNED_OUT") {
          console.log("User signed out, clearing error state");
          setError(null);
        }
        if (event === "USER_UPDATED" && !session) {
          console.log("User updated without session, checking for errors");
          const { error } = await supabase.auth.getSession();
          if (error) {
            console.error("Auth error:", error);
            setError(getErrorMessage(error));
          }
        }
      }
    );

    // Check if user is already signed in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        console.log("Existing session found, navigating to home");
        navigate("/");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const getErrorMessage = (error: AuthError) => {
    console.error("Processing auth error:", error);
    const errorMessage = error.message;
    const errorDetails = error.message.includes('{') ? JSON.parse(error.message) : null;
    
    // Check for specific error codes in the error details
    if (errorDetails?.code === "invalid_credentials") {
      return "Неверный email или пароль. Пожалуйста, проверьте введенные данные.";
    }
    
    if (errorMessage.includes("Database error saving new user")) {
      return "Произошла ошибка при создании аккаунта. Пожалуйста, попробуйте позже.";
    }
    if (errorMessage.includes("Invalid login credentials")) {
      return "Неверный email или пароль. Пожалуйста, проверьте введенные данные.";
    }
    if (errorMessage.includes("Email not confirmed")) {
      return "Пожалуйста, подтвердите ваш email адрес перед входом.";
    }
    return "Произошла непредвиденная ошибка. Пожалуйста, попробуйте снова.";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Добро пожаловать</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="mb-6">
            <RadioGroup
              defaultValue="student"
              className="flex flex-col space-y-2"
              onValueChange={(value) => setSelectedRole(value as 'student' | 'employee')}
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
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: 'hsl(var(--primary))',
                    brandAccent: 'hsl(var(--primary))',
                  },
                },
              },
            }}
            localization={{
              variables: {
                sign_up: {
                  email_label: "Email адрес",
                  password_label: "Пароль",
                  email_input_placeholder: "Ваш email адрес",
                  password_input_placeholder: "Ваш пароль",
                  button_label: "Зарегистрироваться",
                  loading_button_label: "Регистрация...",
                  social_provider_text: "Войти через {{provider}}",
                  link_text: "Нет аккаунта? Зарегистрируйтесь",
                },
                sign_in: {
                  email_label: "Email адрес",
                  password_label: "Пароль",
                  email_input_placeholder: "Ваш email адрес",
                  password_input_placeholder: "Ваш пароль",
                  button_label: "Войти",
                  loading_button_label: "Вход...",
                  social_provider_text: "Войти через {{provider}}",
                  link_text: "Уже есть аккаунт? Войдите",
                },
                forgotten_password: {
                  link_text: "Забыли пароль?",
                  email_label: "Email адрес",
                  password_label: "Пароль",
                  email_input_placeholder: "Ваш email адрес",
                  button_label: "Отправить инструкции для сброса пароля",
                  loading_button_label: "Отправка инструкций...",
                },
                update_password: {
                  password_label: "Новый пароль",
                  password_input_placeholder: "Ваш новый пароль",
                  button_label: "Обновить пароль",
                  loading_button_label: "Обновление пароля...",
                },
                verify_otp: {
                  email_input_label: "Email адрес",
                  email_input_placeholder: "Ваш email адрес",
                  phone_input_label: "Номер телефона",
                  phone_input_placeholder: "Ваш номер телефона",
                  token_input_label: "Код",
                  token_input_placeholder: "Ваш код подтверждения",
                  button_label: "Подтвердить",
                  loading_button_label: "Подтверждение...",
                }
              }
            }}
            providers={[]}
            redirectTo={window.location.origin}
            onlyThirdPartyProviders={false}
            additionalData={{
              role: selectedRole
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;