import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { createComment, getCommentsByPost } from '../controllers/commentController';

const router = Router();

router.post('/', authMiddleware, createComment);
router.get('/:postagemId',getCommentsByPost);

export default router;
