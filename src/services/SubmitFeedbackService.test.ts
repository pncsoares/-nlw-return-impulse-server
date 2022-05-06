import { SubmitFeedbackService } from './SubmitFeedbackService';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackService = new SubmitFeedbackService(
    { create: createFeedbackSpy },
    { sendEmail: sendMailSpy }
);

describe('Submit feedback', () => {

    it('should be able to submit a feedback', async () => {
        await expect(
            submitFeedbackService.execute({
                type: 'BUG',
                comment: 'Example comment',
            })
        ).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit a feedback without type', async () => {
        await expect(
            submitFeedbackService.execute({
                type: '',
                comment: 'Example comment',
                screenshot: 'test.jpg',
            })
        ).rejects.toThrow();
    });

    it('should not be able to submit a feedback without comment', async () => {
        await expect(
            submitFeedbackService.execute({
                type: 'BUG',
                comment: '',
                screenshot: 'test.jpg',
            })
        ).rejects.toThrow();
    });

    it('should not be able to submit a feedback with an invalid screenshot', async () => {
        await expect(
            submitFeedbackService.execute({
                type: 'BUG',
                comment: 'Example comment',
                screenshot: 'test.jpg',
            })
        ).rejects.toThrow();
    });
});
