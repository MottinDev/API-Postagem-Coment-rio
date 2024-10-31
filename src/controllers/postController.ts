import { Request, Response } from 'express';
import Postagem from '../models/postModel';

// Criar postagem
export const createPost = async (req: Request, res: Response) => {
  const { titulo, conteudo } = req.body;
  const autor = (req.user as any).id;

  try {
    const newPost = new Postagem({ titulo, conteudo, autor });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: 'Error creating post' });
  }
};

// Listar todas as postagens
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Postagem.find().populate('autor');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
};

// Obter uma postagem
export const getPostById = async (req: Request, res: Response) => {
  try {
    const post = await Postagem.findById(req.params.id).populate('autor');
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching post' });
  }
};

// Atualizar uma postagem
export const updatePost = async (req: Request, res: Response) => {
  try {
    const post = await Postagem.findById(req.params.id);
    if (post && post.autor.toString() === (req.user as any).id) {
      post.titulo = req.body.titulo || post.titulo;
      post.conteudo = req.body.conteudo || post.conteudo;
      await post.save();
      res.json(post);
    } else {
      res.status(403).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating post' });
  }
};

// Deletar uma postagem
export const deletePost = async (req: Request, res: Response) => {
  try {
    const post = await Postagem.findById(req.params.id);
    if (post && post.autor.toString() === (req.user as any).id) {
      await post.deleteOne();
      res.json({ message: 'Post deleted' });
    } else {
      res.status(403).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting post' });
  }
};
