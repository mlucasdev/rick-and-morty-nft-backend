import express from 'express';
import { authLoginMiddleware } from '../auth/auth.middleware.js';
import { verifyIdExistInDb } from '../characters/characters.middlewares.js';
import { createSaleController, findAllMarketplaceController } from './marketplace.controller.js';

export const marketplaceRouter = express.Router();

marketplaceRouter.post(
  '/create-sale-order/:id',
  authLoginMiddleware,
  createSaleController
);

marketplaceRouter.get('/find', authLoginMiddleware, findAllMarketplaceController)