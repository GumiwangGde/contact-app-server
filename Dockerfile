# 1. Build Dependencies
FROM node:20-alpine AS deps

# 2. Menentukan folder kerja di dalam container
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# 3. Build final image
FROM node:20-alpine AS final

WORKDIR /usr/src/app

# 4. Salin dependencies yang sudah diinstall dari tahap deps
COPY --from=deps /usr/src/app/node_modules ./node_modules

# 5. Salin seluruh kode aplikasi
COPY . .

# Container akan berjalan di port 5000
EXPOSE 5000

# Perintah default yang dijalankan saat container dimulai
CMD [ "npm", "start" ]