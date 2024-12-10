import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';
import { initializeOpenAI } from './utils/initializeOpenAI';
import { UserRoute } from './routes/users.route';
import { ProductRoute } from './routes/products.route';
import { WalletRoute } from './routes/wallet.route';
import { PurchaseRoute } from './routes/purchase.route';

ValidateEnv();

export const openAIHelper = initializeOpenAI();

const app = new App([new UserRoute(), new ProductRoute(), new WalletRoute(), new PurchaseRoute()]);

app.listen();
