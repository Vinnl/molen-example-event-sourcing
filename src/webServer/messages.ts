import * as Http from "molen/drivers/http";
import { map, flatMap } from "rxjs/operators";
import { getLatestMessages } from "../database/messages";

export const latestMessages: Http.HttpHandler = (input$) => {
  return Http.get('/api/messages', input$).pipe(
    flatMap(getLatestMessages),
    map((latestMessages) => {
      const response: Http.HttpOutput = {
        body: latestMessages,
      };

      return response;
    }),
  );
}
