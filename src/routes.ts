import express from 'express';
import { NodeMailerMailAdapter } from './adapters/nodemailer/NodeMailerMailAdapter';
import { PrismaFeedbackRepository } from './repositories/prisma/PrismaFeedbackRepository';
import { SubmitFeedbackService } from './services/SubmitFeedbackService';

export const routes = express.Router();

routes.post('/feedback', async (req, res) => {
    const { type, comment, screenshot } = req.body;

    const prismaFeedbackRepository = new PrismaFeedbackRepository();
    const nodeMailerMailAdapter = new NodeMailerMailAdapter();

    const submitFeedbackService = new SubmitFeedbackService(
        prismaFeedbackRepository,
        nodeMailerMailAdapter
    );

    await submitFeedbackService.execute({
        type,
        comment,
        screenshot,
    });

    return res.status(201).send();
});
