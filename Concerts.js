const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

app.use(cors()); // CORS 설정
app.use(express.json());

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qkrtjdrb',
  database: 'Concerts'
});

db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('MySQL connected');
  }
});

// 콘서트 정보 가져오기
app.get('/Concerts', (req, res) => {
  const query = 'SELECT image_url, start_date, end_date FROM Concerts';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});

// 서버 실행
const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://'0.0.0.0':${PORT}`);
});