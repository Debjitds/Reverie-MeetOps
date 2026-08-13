import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { signUpWithUsername } = useAuth();
  
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className="text-4xl font-bold mb-2 border-b-thick border-primary inline-block pb-2">MeetOps</h1>
          </Link>
          <p className="text-muted-foreground mt-4">Create your account</p>
        </div>

        <Card className="border-thick">
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>Sign up to start managing your resources</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username *</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  value={registerForm.username}
                  onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                  disabled={loading}
                />
                <p className="text-xs text-muted-foreground">
                  Only letters, numbers, and underscores allowed
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  disabled={loading}
                />
                <p className="text-xs text-muted-foreground">
                  At least 8 characters with letters and numbers
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password *</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm your password"
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
                  I agree to the User Agreement and Privacy Policy
                </label>
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Login
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
