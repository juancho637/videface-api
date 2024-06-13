import { ConfigurationType } from './types/configuration.type';
import { FirebaseConfig } from './configs/firebase.config';

export class ConfigurationService {
  private static instance: ConfigurationService;

  static getInstance(): ConfigurationService {
    if (!ConfigurationService.instance) {
      ConfigurationService.instance = new ConfigurationService();
    }

    return ConfigurationService.instance;
  }

  getConfig(): ConfigurationType {
    return {
      firebase: FirebaseConfig.getInstance().config,
    };
  }
}
