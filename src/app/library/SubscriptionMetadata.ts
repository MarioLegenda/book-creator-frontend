export class SubscriptionMetadata {
  private readonly types = {
    infinite_editor_session_anually: {
      settingsList: {
        title: 'Infinite editor session',

      }
    },
    '10_code_project_monthly': {
      settingsList: {
        title: '10 code project imports per blog',
      }
    }
  };

  getSettingsListMetadata(type): any {
    return this.types[type].settingsList;
  }
}
