import { getConnection } from "typeorm";
import { from } from "rxjs";
import { Message } from "../entity/Message";
import { tap } from "rxjs/operators";

export const getLatestMessages = () => {
  const connection = getConnection();

  const latestMessagesPromise = connection
    .getRepository(Message)
    .createQueryBuilder('message')
    .orderBy('message.updated_at', 'DESC')
    .limit(5)
    .getMany();

  const latestMessages$ = from(latestMessagesPromise);

  return latestMessages$;
}
