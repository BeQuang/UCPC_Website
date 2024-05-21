# Chọn một image Node.js để làm base
FROM node:20

# Tạo thư mục làm việc trong Docker image
WORKDIR /usr/src/app

# Sao chép file package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY . .

# Mở cổng 8080 cho ứng dụng
EXPOSE 8080

# Chạy ứng dụng khi Docker container được khởi động
CMD [ "node", "src/server.js" ]