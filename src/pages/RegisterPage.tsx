import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LanguageIndicator } from '@/components/language/LanguageIndicator';
import { toast } from 'sonner';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { signUpWithUsername } = useAuth();
  const { t } = useAppTranslation();
  
  const [registerForm, setRegisterForm] = useState({ 
    username: '', 
    password: '', 
    confirmPassword: '', 
    name: '', 
    agreedToTerms: false 
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!registerForm.username || !registerForm.password || !registerForm.name) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Validate username format
    if (!/^[a-zA-Z0-9_]+$/.test(registerForm.username)) {
      toast.error('Username can only contain letters, numbers, and underscores');
      return;
    }

    // Validate password strength
    if (registerForm.password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(registerForm.password)) {
      toast.error('Password must contain both letters and numbers');
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!registerForm.agreedToTerms) {
      toast.error('Please agree to the User Agreement and Privacy Policy');
      return;
    }

    setLoading(true);
    const { error } = await signUpWithUsername(registerForm.username, registerForm.password, registerForm.name);
    setLoading(false);

    if (error) {
      toast.error(`Registration failed: ${error.message}`);
    } else {
      toast.success('Registration successful! Redirecting to dashboard...');
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 py-12 relative">
      <div className="absolute top-4 right-4">
        <LanguageIndicator />
      </div>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="text-4xl font-bold mb-2 border-b-thick border-primary inline-block pb-2">{t('auth.appName')}</h1>
          </Link>
          <p className="text-muted-foreground mt-4">{t('auth.subtitle')}</p>
        </div>

        <Card className="border-thick">
          <CardHeader>
            <CardTitle>{t('auth.registerTab')}</CardTitle>
            <CardDescription>{t('auth.loginOrRegister')}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t('auth.fullName')} *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t('auth.fullNamePlaceholder')}
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">{t('auth.username')} *</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder={t('auth.usernameRegisterPlaceholder')}
                  value={registerForm.username}
                  onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                  disabled={loading}
                />
                <p className="text-xs text-muted-foreground">
                  {t('auth.usernameRegisterPlaceholder')}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t('auth.password')} *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder={t('auth.passwordRegisterPlaceholder')}
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  disabled={loading}
                />
                <p className="text-xs text-muted-foreground">
                  {t('auth.passwordRegisterPlaceholder')}
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">{t('auth.confirmPassword')} *</Label>
                <Input
                  id="confirm-password"
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
                  onCheckedChange={(checked) => 
                    setRegisterForm({ ...registerForm, agreedToTerms: checked as boolean })
                  }
                  disabled={loading}
                />
                <label htmlFor="terms" className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  {t('auth.termsAgreement')}
                </label>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating account...' : t('auth.registerButton')}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  {t('auth.loginButton')}
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
