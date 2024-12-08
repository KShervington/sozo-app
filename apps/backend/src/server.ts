import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';
import { initializeOpenAI } from './utils/initializeOpenAI';
import { SubmissionRoute } from './routes/submission.route';
import { UserRoute } from './routes/users.route';
import { ProductRoute } from './routes/products.route';
import { WalletRoute } from './routes/wallet.route';
import PurchaseRoute from './routes/purchase.route';

ValidateEnv();

export const openAIHelper = initializeOpenAI();

const app = new App([new SubmissionRoute(), new UserRoute(), new ProductRoute(), new WalletRoute()]);

app.listen();
