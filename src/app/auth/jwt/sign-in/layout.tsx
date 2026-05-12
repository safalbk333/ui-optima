import { AuthSplitLayout } from 'src/layouts/auth-split';
import { GuestGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <GuestGuard>
      <AuthSplitLayout
        slotProps={{
          section: {
            title: 'OPTIMA SUITE',
            subtitle:
              'Streamline procurement, vendor collaboration, RFQ management, approvals, and payment workflows in one unified Procure-to-Pay platform.',
          },
        }}
      >
        {children}
      </AuthSplitLayout>
    </GuestGuard>
  );
}
