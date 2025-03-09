
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.089f40ffc02548a4ac2c596592bd009d',
  appName: 'solvy-connect',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: "https://089f40ff-c025-48a4-ac2c-596592bd009d.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
};

export default config;
