import { map } from 'rxjs/operators';
import * as Http from 'molen/dist/drivers/http';

const port = process.env.PORT ? Number.parseInt(process.env.PORT, 10) : 3000;

const server: Http.HttpHandler = (input$) => {
  return input$.pipe(
    map(() => ({ body: [ 'Hi!' ] })),
  );
};

Http.driver(server, { port });
