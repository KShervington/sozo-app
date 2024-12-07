import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { OpenaiService } from '@/services/openai.service';
import { Submission } from '@/interfaces/submission.interface';
import { HttpException } from '@/exceptions/HttpException';
import { CaptchaService } from '@/services/captcha.service';

export class SubmissionController {
  public openai = Container.get(OpenaiService);
  public captcha = Container.get(CaptchaService);

  public submitReceipt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body: Omit<Submission, 'timestamp'> = req.body;

      if (!(await this.captcha.validateCaptcha(body.captcha))) {
        throw new HttpException(400, 'Invalid captcha. Please try again.');
      }

      const submissionRequest: Submission = {
        ...body,
        timestamp: Date.now(),
      };

      const validationResult = await this.openai.validateImage(body.image);

      if (validationResult == undefined || !('validityFactor' in (validationResult as object))) {
        throw new HttpException(500, 'Error validating image');
      }

      res.status(200).json({ validation: validationResult });
    } catch (error) {
      next(error);
    }
  };
}
