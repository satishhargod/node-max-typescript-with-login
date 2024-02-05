import { User, UserDocument } from '../../models/user.model';
import BaseRepository from '../base.repository';

export default class UserRepository extends BaseRepository<UserDocument, typeof User> {
  constructor() {
    super('User', User);
  }
}
