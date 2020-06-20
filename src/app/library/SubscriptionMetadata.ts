export class SubscriptionMetadata {
  private readonly types = {
    infinite_editor_session_annually: {
      settingsList: {
        title: 'Infinite editor session',
      }
    },
    infinite_editor_session_monthly: {
      settingsList: {
        title: 'Infinite editor session'
      }
    },
    timeout_reader_increase_monthly: {
      settingsList: {
        title: 'Increase timeout for readers',
      }
    },
    timeout_reader_increase_annually: {
      settingsList: {
        title: 'Increase timeout for readers',
      }
    },
    timeout_author_increase_monthly: {
      settingsList: {
        title: 'Increased timeout for authors and their readers',
      }
    },
    timeout_author_increase_annually: {
      settingsList: {
        title: 'Increased timeout for authors and their readers',
      }
    }
  };

  getSettingsListMetadata(type): any {
    return this.types[type].settingsList;
  }
}
