import { Router } from 'express';
import { authRequired } from '../middlewares/auth.js';
import * as ctrl from '../controllers/exchange.controller.js';

const router = Router();

router.post('/', authRequired, ctrl.createExchange); 
router.get('/incoming', authRequired, ctrl.getIncoming); 
router.get('/outgoing', authRequired, ctrl.getOutgoing); 
router.patch('/:id/accept', authRequired, ctrl.accept);
router.patch('/:id/reject', authRequired, ctrl.reject);
router.patch('/:id/cancel', authRequired, ctrl.cancel);

export default router;
