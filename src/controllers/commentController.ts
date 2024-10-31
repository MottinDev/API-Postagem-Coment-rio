import { Request, Response } from 'express';
import Comentario from '../models/commentModel';

// Criar comentário
export const createComment = async (req: Request, res: Response) => {
  const { postagem, conteudo } = req.body;
  const autor = (req.user as any).id;

  try {
    const newComment = new Comentario({ postagem, conteudo, autor });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ error: 'Error creating comment' });
  }
};

// Listar todos os comentários de uma postagem
export const getCommentsByPost = async (req: Request, res: Response) => {
  try {
    const comments = await Comentario.find({ postagem: req.params.postagemId }).populate('autor');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching comments' });
  }
};
