import * as express from 'express';
import parentCategoryRoutes from './routes/parentCategoryRoutes';
import authRoutes from './routes/authRoutes';
import categoryRoutes from './routes/categoryRoutes';
import * as path from 'path';
import productRoutes from './routes/productRoutes';
import homeRoutes from './routes/HomeRoutes';
import * as cors from 'cors';
import cartRoutes from './routes/cartRoutes';
import wishListController from './controllers/wishListController';
import wishListRoutes from './routes/wishListRoutes';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://*',
  ],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use('*', cors(corsOptions));

// Routes
app.use('/api/parent-categories', parentCategoryRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api', homeRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishListRoutes);
// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));
// allow cors requests using exprss

// Start the server
const server=app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
});

// after closing the server
// process.on('exit', () => {
//   prisma.$disconnect();
// });
const shutdown = async () => {
  console.log('Shutting down server...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);






export default app;
