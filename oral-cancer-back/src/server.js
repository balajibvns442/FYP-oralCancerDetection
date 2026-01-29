const app = require('./app');
const pool = require('./db');

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// async function startServer() {
//   try {
//     await pool.query('SELECT 1');
//     console.log('MySQL connected');

//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error('Database connection failed:', err.message);
//     process.exit(1);
//   }
// }

// startServer();


// only boot logic here