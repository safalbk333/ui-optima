import 'src/global.css';

import type { Metadata, Viewport } from 'next';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';
import { themeConfig, ThemeProvider } from 'src/theme';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { AuthProvider } from 'src/auth/context/auth-provider';
import { CONFIG } from 'src/global-config';
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { ProgressBar } from 'src/components/progress-bar';
import ReduxProvider from 'src/store/Provider';
import { detectSettings } from 'src/components/settings/server';
import { primary } from 'src/theme/core/palette';

// ----------------------------------------------------------------------

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: primary.main,
};

export const metadata: Metadata = {
  icons: [
    {
      rel: 'icon',
      url: `${CONFIG.assetsDir}/favicon.ico`,
    },
  ],
};

// ----------------------------------------------------------------------

type RootLayoutProps = {
  children: React.ReactNode;
};

async function getAppConfig() {
  if (CONFIG.isStaticExport) {
    return {
      cookieSettings: undefined,
      dir: defaultSettings.direction,
    };
  } else {
    const [settings] = await Promise.all([detectSettings()]);

    return {
      cookieSettings: settings,
      dir: settings.direction,
    };
  }
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const appConfig = await getAppConfig();

  return (
    <html lang="en" dir={appConfig.dir} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript
          modeStorageKey={themeConfig.modeStorageKey}
          attribute={themeConfig.cssVariables.colorSchemeSelector}
          defaultMode={themeConfig.defaultMode}
        />

        <AuthProvider>
          <SettingsProvider
            cookieSettings={appConfig.cookieSettings}
            defaultSettings={defaultSettings}
          >
            <AppRouterCacheProvider options={{ key: 'css' }}>
              <ThemeProvider
                modeStorageKey={themeConfig.modeStorageKey}
                defaultMode={themeConfig.defaultMode}
              >
                <MotionLazy>
                  <ProgressBar />
                  <SettingsDrawer defaultSettings={defaultSettings} />
                                    <ReduxProvider>

                  {children}
                  </ReduxProvider>
                </MotionLazy>
              </ThemeProvider>
            </AppRouterCacheProvider>
          </SettingsProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
