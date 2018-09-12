jest.mock('../src/database.ts', () => ({ setDatabaseStream: jest.fn() }));

import { TestScheduler } from 'rxjs/testing';
import { of, from } from 'rxjs';

import { verifyValues } from './testHelpers';
import { chatServer } from '../src/chatServer';
import { Message } from '../src/entity/Message';

const scheduler = new TestScheduler((actual, expected) => expect(actual).toEqual(expected));

it('should not provide output when unknown messages are sent', (done) => {
  const input$ = of({ data: 'unrecognised_input', id: 1337 });
  const output$ = chatServer(input$);

  verifyValues(done, output$, []);
});

it('should broadcast a single user\'s message', (done) => {
  const input$ = of({ data: 'msg:This is a mock message', id: 1337 });
  const output$ = chatServer(input$);

  const expected = [
    { broadcast: JSON.stringify({ user: 'User 1337', message: 'This is a mock message' }) }
  ];

  verifyValues(done, output$, expected);
});

it('should store broadcasted messages to the database', (done) => {
  const { setDatabaseStream }: { setDatabaseStream: jest.Mock } = require.requireMock('../src/database.ts');

  const input$ = of({ data: 'msg:This is a mock message', id: 1337 });
  chatServer(input$);

  const expectedRow = new Message();
  expectedRow.user = 'User 1337';
  expectedRow.content = 'This is a mock message';
  const expected = [ expectedRow ];

  verifyValues(done, setDatabaseStream.mock.calls[0][0], expected);
});
