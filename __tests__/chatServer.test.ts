jest.mock('../src/database.ts', () => ({ setDatabaseStream: jest.fn() }));

import { TestScheduler } from 'rxjs/testing';
import { of, from } from 'rxjs';

import { verifyValues } from './testHelpers';
import { chatServer } from '../src/chatServer';

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
