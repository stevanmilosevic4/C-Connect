import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// JSX lives in .jsx files; React plugin handles the transform.
export default defineConfig({
  plugins: [react()],
});
