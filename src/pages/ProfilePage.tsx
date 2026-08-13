import { AppLayout } from '@/components/layouts/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { LanguageSelector } from '@/components/language/LanguageSelector';
import { Badge } from '@/components/ui/badge';

export default function ProfilePage() {
  const { profile } = useAuth();
  const { t, currentLanguage } = useAppTranslation();

  if (!profile) {
    return null;
  }

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold border-b-thick border-primary inline-block pb-1 uppercase">
            {t('profile.title')}
          </h1>
          <p className="text-muted-foreground mt-2">{t('profile.personalInfo')}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Account Information */}
          <Card className="border-3 border-black">
            <CardHeader>
              <CardTitle className="uppercase">{t('profile.personalInfo')}</CardTitle>
              <CardDescription>Your basic account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-bold uppercase text-muted-foreground">{t('profile.name')}</p>
                <p className="text-lg">{profile.name}</p>
              </div>
              <div>
                <p className="text-sm font-bold uppercase text-muted-foreground">{t('profile.email')}</p>
                <p className="text-lg">{profile.email}</p>
              </div>
              <div>
                <p className="text-sm font-bold uppercase text-muted-foreground">{t('profile.role')}</p>
                <Badge className="uppercase">{t(`navbar.${profile.role}`)}</Badge>
              </div>
              <div>
                <p className="text-sm font-bold uppercase text-muted-foreground">Member Since</p>
                <p className="text-lg">
                  {new Intl.DateTimeFormat(currentLanguage === 'en' ? 'en-US' : currentLanguage, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }).format(new Date(profile.created_at))}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Language Preference */}
          <Card className="border-3 border-black">
            <CardHeader>
              <CardTitle className="uppercase">{t('profile.languagePreference')}</CardTitle>
              <CardDescription>Choose your preferred language for the application</CardDescription>
            </CardHeader>
            <CardContent>
              <LanguageSelector />
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
