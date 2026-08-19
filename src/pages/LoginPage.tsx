import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LanguageIndicator } from '@/components/language/LanguageIndicator';
import { toast } from 'sonner';

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signInWithUsername, signUpWithUsername } = useAuth();
  const { t } = useAppTranslation();
  
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ username: '', password: '', confirmPassword: '', name: '', agreedToTerms: false });
  const [loading, setLoading] = useState(false);

  const from = (location.state as { from?: string })?.from || '/dashboard';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginForm.username || !loginForm.password) {
      toast.error(t('login.enterUsernamePassword'));
      return;
    }

    // Validate username format
    if (!/^[a-zA-Z0-9_]+$/.test(loginForm.username)) {
      toast.error(t('login.usernameFormat'));
      return;
    }

    setLoading(true);
    const { error } = await signInWithUsername(loginForm.username, loginForm.password);
    setLoading(false);

    if (error) {
      toast.error(`${t('login.loginFailed')}: ${error.message}`);
    } else {
      toast.success(t('login.loginSuccess'));
      navigate(from, { replace: true });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!registerForm.username || !registerForm.password || !registerForm.name) {
      toast.error(t('login.fillAllFields'));
      return;
    }

    // Validate username format
    if (!/^[a-zA-Z0-9_]+$/.test(registerForm.username)) {
      toast.error(t('login.usernameFormat'));
      return;
    }

    // Validate password strength
    if (registerForm.password.length < 8) {
      toast.error(t('login.passwordMinLength'));
      return;
    }

    if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(registerForm.password)) {
      toast.error(t('login.passwordRequirements'));
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error(t('login.passwordsDoNotMatch'));
      return;
    }

    if (!registerForm.agreedToTerms) {
      toast.error(t('login.agreeToTermsRequired'));
      return;
    }

    setLoading(true);
    const { error } = await signUpWithUsername(registerForm.username, registerForm.password, registerForm.name);
    setLoading(false);

    if (error) {
      toast.error(`${t('login.registrationFailed')}: ${error.message}`);
    } else {
      toast.success(t('login.registrationSuccess'));
      setRegisterForm({ username: '', password: '', confirmPassword: '', name: '', agreedToTerms: false });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 py-12 relative">
      <div className="absolute top-4 right-4">
        <LanguageIndicator />
      </div>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 border-b-thick border-primary inline-block pb-2">{t('auth.appName')}</h1>
          <p className="text-muted-foreground mt-4">{t('auth.subtitle')}</p>
        </div>

        <Card className="border-thick">
          <CardHeader>
            <CardTitle>{t('auth.welcome')}</CardTitle>
            <CardDescription>{t('auth.loginOrRegister')}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">{t('auth.loginTab')}</TabsTrigger>
                <TabsTrigger value="register">{t('auth.registerTab')}</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-username">{t('auth.username')}</Label>
                    <Input
                      id="login-username"
                      type="text"
                      placeholder={t('auth.usernameLoginPlaceholder')}
                      value={loginForm.username}
                      onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">{t('auth.password')}</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder={t('auth.passwordLoginPlaceholder')}
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                  <div className="flex justify-end">
                    <Link to="/reset-password" className="text-sm text-primary hover:underline">
                      {t('auth.forgotPassword')}
                    </Link>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? t('login.loggingIn') : t('auth.loginButton')}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">{t('auth.fullName')}</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder={t('auth.fullNamePlaceholder')}
                      value={registerForm.name}
                      onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-username">{t('auth.username')}</Label>
                    <Input
                      id="register-username"
                      type="text"
                      placeholder={t('auth.usernameRegisterPlaceholder')}
                      value={registerForm.username}
                      onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">{t('auth.password')}</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder={t('auth.passwordRegisterPlaceholder')}
                      value={registerForm.password}
                      onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm-password">{t('auth.confirmPassword')}</Label>
                    <Input
                      id="register-confirm-password"
                      type="password"
                      placeholder={t('auth.confirmPasswordPlaceholder')}
                      value={registerForm.confirmPassword}
                      onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                      disabled={loading}
                    />
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="terms"
                      checked={registerForm.agreedToTerms}
                      onCheckedChange={(checked) => setRegisterForm({ ...registerForm, agreedToTerms: checked as boolean })}
                      disabled={loading}
                    />
                    <label htmlFor="terms" className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {t('auth.termsAgreement')}
                    </label>
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? t('login.registering') : t('auth.registerButton')}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
