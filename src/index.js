import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { connectDatabase } from './database/database.js';
import { characterRouter } from './characters/characters.routes.js';
import { userRouter } from './users/users.routes.js';
import { authRouter } from './auth/auth.routes.js';
import { swaggerRouter } from './swagger/swagger.routes.js';
import { cartRouter } from './cart/cart.routes.js';
import { marketplaceRouter } from './marketplace/marketplace.routes.js';

dotenv.config();
const port = process.env.PORT || 3001;
const app = express();

connectDatabase();
app.use(cors());
app.use(express.json());

app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/characters', characterRouter);
app.use('/cart', cartRouter);
app.use('/marketplace', marketplaceRouter);
app.use('/api-docs', swaggerRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
