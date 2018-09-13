import * as WebSocket from 'molen/drivers/websocket';
import { merge, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { setDatabaseStream } from '../database';
import { Message } from '../entity/Message';

interface MessageResponse {
  user: string;
  message: string;
}
type Response = MessageResponse;
type UnserialisedOutput = {
  announce?: Response,
  broadcast?: Response,
  message?: Response,
};

type ChatHandler = (input$: Observable<WebSocket.WebSocketInput>) => Observable<UnserialisedOutput>;

export const chatServer: WebSocket.WebSocketHandler = (input$) => {
  const responses$ = merge(
    newConnections(input$),
    messages(input$),
  );

  setDatabaseStream(responses$.pipe(
    filter(response => typeof response.broadcast !== 'undefined'),
    map((response) => {
      const data: Response = response.broadcast!;
      const row = new Message();
      row.user = data.user;
      row.content = data.message;

      return row;
    }),
  ));

  return responses$.pipe(map(serialise));
};

const newConnections: ChatHandler = (input$) => {
  return WebSocket.onMessage('connect', input$).pipe(
    map((input) => ({
      message: { user: 'System', message: `Welcome User ${input.id}!` },
      broadcast: { user: 'System', message: `User ${input.id} connected.` },
    })),
  );
};

const messages: ChatHandler = (input$) => {
  return WebSocket.onMessage(/msg\:(.*)/, input$).pipe(
    map((input) => ({
      broadcast: { user: `User ${input.id}`, message: input.data.substr(4) },
    })),
  );
};

const serialise = (unserialisedOutput: UnserialisedOutput) => ({
  announce: unserialisedOutput.announce ? JSON.stringify(unserialisedOutput.announce) : undefined,
  broadcast: unserialisedOutput.broadcast ? JSON.stringify(unserialisedOutput.broadcast) : undefined,
  message: unserialisedOutput.message ? JSON.stringify(unserialisedOutput.message) : undefined,
});
