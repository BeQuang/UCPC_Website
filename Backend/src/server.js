require('dotenv').config();
import express from 'express';
import { testConnection } from './configs/dbConnection';
import configCORS from './configs/configCORS';
import initApiRoutes from './Routes/apiRoutes';

// Kết nối thử DB
testConnection();

// Khởi tạo ứng dụng
const app = express();

//config for parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cấu hình CORS
configCORS(app);

// Xử lý yêu cầu preflight
app.options('*', (req, res) => {
    res.set({
        'Access-Control-Allow-Origin': process.env.REACT_APP_API_URL,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    });
    res.status(200).end(); // Phản hồi với mã trạng thái 200
});

// Khởi tạo các routes
initApiRoutes(app);

app.use((req, res, next) => {
    res.status(404).send('Sorry cant find that!');
});
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log('App is running on port: ' + PORT + ' -> http://localhost:' + PORT);
});