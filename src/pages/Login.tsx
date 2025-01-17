import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          navigate("/");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Добро пожаловать</CardTitle>
        </CardHeader>
        <CardContent>
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
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;