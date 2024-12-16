import { userSession } from './Wallet';
import { Storage } from '@stacks/storage';

export const storage = new Storage({ userSession });