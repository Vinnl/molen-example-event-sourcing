import { Observable } from 'rxjs';

export function verifyValues(done: jest.DoneCallback, observable$: Observable<any>, values: any[]) {
  return verifyObservable(done, observable$, values, []);
}

export function verifyErrors(done: jest.DoneCallback, observable$: Observable<any>, errors: any[]) {
  return verifyObservable(done, observable$, errors, []);
}

export function verifyObservable(
  done: jest.DoneCallback,
  observable$: Observable<any>,
  values: any[],
  errors: any[],
) {
  const errorFn = jest.fn();
  const nextFn = jest.fn();

  observable$.subscribe(nextFn, errorFn, () => {
    expect(nextFn.mock.calls.length).toBe(values.length);
    expect(nextFn.mock.calls).toEqual(values.map(value => [value]));
    expect(errorFn.mock.calls.length).toBe(errors.length);
    expect(errorFn.mock.calls).toEqual(errors.map(error => [error]));
    done();
  });
}