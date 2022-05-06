import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../MailAdapter';

const transport = nodemailer.createTransport({
    host: 'smtp.mailtrap.io',
    port: 2525,
    auth: {
        user: '297db50b38c32d',
        pass: '38d6842d316ba4',
    },
});

export class NodeMailerMailAdapter implements MailAdapter {
    async sendEmail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipa Feedget <oi@feedget.com>',
            to: 'Pedro Soares <pncsoares@gmail.com>',
            subject,
            html: body,
        });
    }
}
