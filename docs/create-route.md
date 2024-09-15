This tutorial assumes that there is no existing infrastructure for the route you are creating (i.e. controllers, route file, etc.). If some these resources already exist, some of the steps mentioned may only require editing existing infrastructure rather than newly creating it.

1. **Create functionality for the route:**

   - Create a controller file at `.\apps\backend\src\controllers\` with the naming scheme `<controller name>.controller.ts`. This is where you will write your route logic.
   - Your file should look like this

     ```typescript
     import { NextFunction, Request, Response } from "express";

     export class ExampleController {
       public exampleFunction = async (
         req: Request,
         res: Response,
         next: NextFunction
       ): Promise<void> => {
         // logic goes here
       };
     }
     ```

2. **Create the route:**

   - Create a new file at `.\apps\backend\src\routes\` with the naming scheme `<route name>.route.ts`
   - Your final route file should look like this:

     ```ts
     import { Router } from "express";
     import { Routes } from "@interfaces/routes.interface";
     import { ExampleController } from "@/controllers/example.controller";

     export class ExampleRoute implements Routes {
       public router = Router();
       public user = new ExampleController();

       constructor() {
         this.initializeRoutes();
       }

       // New routes will be declared here
       private initializeRoutes() {
         this.router.post("/users", this.user.exampleFunction); // example POST route
       }
     }
     ```

3. **Add route to route list**

   - Add your new route to the route array in `.\apps\backend\src\server.ts`

     ```ts
     import { ExampleRoute } from "./routes/example.route"; // import your route

     // ...

     const app = new App([new SubmissionRoute(), new ExampleRoute()]); // add route to array
     ```

For the above example, new example routes would be declared in `.\apps\backend\src\routes\example.route` and their functionality created in a function in `.\apps\backend\src\controllers\example.controller`.
