import express from 'express';
import product from "../controllers/product.js";
import { checkValidation } from '../middleWare/validation.js';

const router = express.Router();
router.get('/:name?', checkValidation(product.rules), product.index);
router.post('/', checkValidation(product.rules), product.add);
router.delete('/:name?', product.delete);
router.put('/', checkValidation(product.rules), product.update);

export default router;