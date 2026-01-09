import { Module } from '@nestjs/common';
import { MailsService } from './mails.service';
import { MailsController } from './mails.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  controllers: [MailsController],
  providers: [MailsService],
  imports: [
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_APP_PASSWORD,
        },
      },
      defaults: {
        from: '"EventHub" <no-reply@eventhub.com>',
      },
    }),
  ],
  exports: [MailsService],
})
export class MailsModule {}
