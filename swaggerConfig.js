import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const components = yaml.load(fs.readFileSync(path.join(__dirname, './docs/components.yaml'), 'utf-8'));
const auth = yaml.load(fs.readFileSync(path.join(__dirname, './docs/auth.yaml')));
const contacts = yaml.load(fs.readFileSync(path.join(__dirname, './docs/contacts.yaml')));
const labels = yaml.load(fs.readFileSync(path.join(__dirname, './docs/labels.yaml')));

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Contact App API',
    version: '1.0.0',
    description: 'Dokumentasi API interaktif untuk Aplikasi Kontak',
  },
  servers: [
    {
      url: 'http://localhost:5000/api/v1',
      description: 'Development server',
    },
  ],
  // Menggabungkan semua skema dari file components.yaml dan menambahkan skema keamanan
  components: {
    ...components,
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  // Menggabungkan semua tag dari setiap file rute
  tags: [
    ...auth.tags,
    ...contacts.tags,
    ...labels.tags,
  ],
  // Menggabungkan semua path (endpoint) dari setiap file rute
  paths: {
    ...auth.paths,
    ...contacts.paths,
    ...labels.paths,
  },
  // Menerapkan keamanan Bearer Token secara global ke semua endpoint (kecuali yang di-override)
  security: [
    {
      bearerAuth: [],
    },
  ],
};

export default swaggerDefinition;