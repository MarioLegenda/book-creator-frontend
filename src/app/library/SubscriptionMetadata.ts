export class SubscriptionMetadata {
  private readonly types = {
    infinite_editor_session_anually: {
      settingsList: {
        title: 'Infinite editor session',
      }
    },
    infinite_editor_session_monthly: {
      settingsList: {
        title: 'Infinite editor session'
      }
    },
    '10_code_project_monthly': {
      settingsList: {
        title: '10 code project imports per blog',
      }
    },
    '10_code_project_anually': {
      settingsList: {
        title: '10 code project imports per blog',
      }
    },
    timeout_increase_monthly: {
      settingsList: {
        title: 'Up to 20 seconds code execution timeout for your readers',
      }
    },
    timeout_increase_anually: {
      settingsList: {
        title: 'Up to 20 seconds code execution timeout for your readers',
      }
    }
  };

  getSettingsListMetadata(type): any {
    return this.types[type].settingsList;
  }
}
