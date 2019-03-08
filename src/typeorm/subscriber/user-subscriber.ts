import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { User } from '../entity/User';

@EventSubscriber()
export class UserSubscribe implements EntitySubscriberInterface<User> {
  /**
     * Indicates that this subscriber only listen to User events.
     */
  listenTo() {
    return User;
  }

  /**
     * Called before entity insertion.
     */
  beforeInsert(event: InsertEvent<User>) {
    console.log('BEFORE USER INSERTED: ', event.entity);
  }

  /**
     * Called before entity insertion.
     */
  beforeUpdate(event: UpdateEvent<User>) {
    console.log(`BEFORE ENTITY UPDATED: `, event.entity);
  }

  /**
     * Called before entity insertion.
     */
  beforeRemove(event: RemoveEvent<User>) {
    console.log('BEFORE ENTITY WITH ID ${event.entityId} REMOVED: ', event.entity);
  }
}