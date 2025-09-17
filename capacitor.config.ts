import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.57f553fb1398445aaf48378fd0a487b8',
  appName: 'Gym Buddies',
  webDir: 'dist',
  server: {
    url: "https://57f553fb-1398-445a-af48-378fd0a487b8.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  android: {
    allowMixedContent: true
  }
};

export default config;