import express from 'express';
import movie from "../controllers/movie.js";
//import { checkValidation } from '../middleWare/validation.js';

const router = express.Router();
router.get('/:name?', checkValidation(movie.rules), movie.index);
router.post('/', checkValidation(movie.rules), movie.add);
router.delete('/:name?', movie.delete);
router.put('/', checkValidation(movie.rules), movie.update);

export default router;