import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // O site fica em https://ypiccoli.github.io/healthsec-score/
  base: '/healthsec-score/',
  plugins: [react()],
  test: { environment: 'node' },
});
