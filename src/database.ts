import "reflect-metadata";

import { createConnection, Connection } from 'typeorm';
import { from, Observable } from "rxjs";
import { withLatestFrom } from "rxjs/operators";

async function initialiseDatabase(): Promise<Connection> {
  try {
    const connection = await createConnection();

    await connection.runMigrations({
      transaction: true,
    });

    return connection;
  } catch (e) {
    console.error('Datbase error:', e);

    return e;
  }
}

const connection$ = from(initialiseDatabase());

export function setDatabaseStream<Entity>(entity$: Observable<Entity>) {
  return entity$
    .pipe(
      withLatestFrom(connection$),
    )
    .subscribe(([entity, connection]) => {
      return connection.manager.save(entity)
    });
}
