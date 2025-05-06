import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.medchain.app',
  appName: 'MedChain',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
