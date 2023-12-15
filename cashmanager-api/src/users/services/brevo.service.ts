import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class BrevoService {
  private readonly API_KEY: string;

  constructor(private readonly configService: ConfigService) {
    this.API_KEY = this.configService.get<string>('BREVO_API_KEY');
  }
  async sendEmail(
    email: string,
    name: string,
    htmlContent: string,
    subject: string,
  ): Promise<any> {
    const data = {
      sender: {
        name: 'CashManager',
        email: 'noreply@cashmanager.com',
      },
      to: [
        {
          name: name,
          email: email,
        },
      ],
      subject,
      htmlContent,
      type: 'transactional',
    };

    try {
      const response = await axios.post(
        'https://api.brevo.com/v3/smtp/email',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'api-key': `${this.API_KEY}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'envoi du Mail:", error);
      throw error;
    }
  }
}
