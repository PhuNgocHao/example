# Node.js & TypeScript Customer Request API

Ứng dụng Client-Server dùng Node.js, Express, TypeScript và SQLite.

## Chạy ứng dụng

```bash
cd vidu
npm install
npm run dev
```

Server chạy tại `http://localhost:9000`.

## Kiểm tra Request/Response

GET trạng thái người dùng:

```bash
curl http://localhost:9000/api/get
```

POST yêu cầu khách hàng:

```bash
curl -X POST http://localhost:9000/api/request \
	-H "Content-Type: application/json" \
	-d '{"customerName":"Nguyen Van A","message":"Can ho tro toi?"}'
```

GET danh sách yêu cầu đã lưu trong SQLite:

```bash
curl http://localhost:9000/api/requests
```

Có thể dùng Postman với các URL trên. CSDL được tạo tự động tại `vidu/data/app.db`.