import { FirebaseConfigType } from '../types/firebase-config.type';

export class FirebaseConfig {
  private static instance: FirebaseConfig;
  private _config: FirebaseConfigType;

  private constructor() {
    this._config = {
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseClientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      firebasePrivateKey: process.env.FIREBASE_PRIVATE_KEY,
    };
  }

  static getInstance(): FirebaseConfig {
    if (!FirebaseConfig.instance) {
      FirebaseConfig.instance = new FirebaseConfig();
    }
    return FirebaseConfig.instance;
  }

  get config(): FirebaseConfigType {
    return this._config;
  }
}
