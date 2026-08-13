import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useAppTranslation } from '@/hooks/useAppTranslation';

interface LogoutConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

export function LogoutConfirmDialog({ open, onOpenChange, onConfirm }: LogoutConfirmDialogProps) {
  const { t } = useAppTranslation();
  
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="border-3 border-black bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold uppercase tracking-wide">
            {t('logoutDialog.title')}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            {t('logoutDialog.description')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="font-bold uppercase">
            {t('logoutDialog.cancel')}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} className="font-bold uppercase">
            {t('logoutDialog.logout')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
