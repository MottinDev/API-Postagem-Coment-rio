import { Router } from 'express';
import { createPost, getPosts, getPostById, updatePost, deletePost } from '../controllers/postController';
import { authMiddleware } from '../middleware/authMiddleware';

const postRoutes = Router();

postRoutes.post('/', authMiddleware, createPost);
postRoutes.get('/', getPosts);
postRoutes.get('/:id', getPostById);
postRoutes.put('/:id', authMiddleware, updatePost);
postRoutes.delete('/:id', authMiddleware, deletePost);

export default postRoutes;
