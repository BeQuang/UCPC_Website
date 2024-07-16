# Chọn một image Node.js để làm base
FROM node:20

# Tạo thư mục làm việc trong Docker image
WORKDIR /app

# Sao chép file package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

COPY start.sh /app/

RUN sed -i 's/\r$//' /app/start.sh  && \  
    chmod +x /app/start.sh
# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .
