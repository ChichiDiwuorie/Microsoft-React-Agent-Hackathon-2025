const { Client } = require('@microsoft/microsoft-graph-client');
const { TokenCredentialAuthenticationProvider } = require('@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials');
const { DefaultAzureCredential } = require('@azure/identity');
const PowerBIEmbedding = require('../powerBI/powerbi-embed-sample');

class M365Agent {
  constructor(config) {
    this.config = config;
    this.graphClient = null;
    this.powerBi = null;
  }

  async initialize() {
    try {
      // Initialize Azure AD authentication
      const credential = new DefaultAzureCredential();
      const authProvider = new TokenCredentialAuthenticationProvider(credential, {
        scopes: ['https://graph.microsoft.com/.default']
      });

      // Initialize Microsoft Graph client
      this.graphClient = Client.initWithMiddleware({ authProvider });

      // Initialize Power BI client
      this.powerBi = new PowerBIEmbedding({
        workspaceId: this.config.powerBI.workspaceId,
        reportId: this.config.powerBI.reportId
      });
      await this.powerBi.initialize();

      console.log('M365 Agent initialized successfully');
    } catch (error) {
      console.error('Failed to initialize M365 Agent:', error);
      throw error;
    }
  }

  async sendTeamsNotification(channelId, message) {
    try {
      await this.graphClient
        .api(`/teams/${this.config.teams.teamId}/channels/${channelId}/messages`)
        .post({
          body: {
            content: message
          }
        });
      console.log('Teams notification sent successfully');
    } catch (error) {
      console.error('Failed to send Teams notification:', error);
      throw error;
    }
  }

  async scheduleAutomation(schedule) {
    // Implementation for scheduling automated tasks
    console.log('Scheduling automation:', schedule);
  }

  async generateReport() {
    try {
      const reportConfig = await this.powerBi.getReportConfig();
      console.log('Report generated successfully');
      return reportConfig;
    } catch (error) {
      console.error('Failed to generate report:', error);
      throw error;
    }
  }
}

module.exports = M365Agent; 