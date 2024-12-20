import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests", // Répertoire des fichiers de test
  timeout: 30000, // Timeout par défaut (30 secondes)
  retries: 2, // Nombre de relances en cas d'échec
  use: {
    headless: true, // Mode sans interface utilisateur
    baseURL: "https://fictif.freyza.net/profile", // URL de base pour vos tests
    screenshot: "on", // Captures d'écran en cas de problème
    video: "retain-on-failure", // Enregistrement vidéo des tests échoués
  },
});
