import { MailAdapter } from '../adapters/MailAdapter';
import { FeedbackRepository } from '../repositories/FeedbackRepository';

interface SubmitFeedbackServiceRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackService {
    private readonly _feedbackRepository: FeedbackRepository;
    private readonly _mailAdapter: MailAdapter;

    constructor(
        feedbackRepository: FeedbackRepository,
        mailAdapter: MailAdapter
    ) {
        this._feedbackRepository = feedbackRepository;
        this._mailAdapter = mailAdapter;
    }

    async execute(request: SubmitFeedbackServiceRequest) {
        const { type, comment, screenshot } = request;

        if (!type) {
            throw new Error('Type is required!');
        }

        if (!comment) {
            throw new Error('Comment is required!');
        }

        if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
            throw new Error('Invalid screenshot format.');
        }

        await this._feedbackRepository.create({
            type,
            comment,
            screenshot,
        });

        await this._mailAdapter.sendEmail({
            subject: 'Novo feedback',
            body: [
                `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
                `<p>Tipo do feedback: ${type}</p>`,
                `<p>Comentário: ${comment}</p>`,
                screenshot ? `<img src="${screenshot}" />` : '',
                `</div>`,
            ].join('\n'),
        });
    }
}
