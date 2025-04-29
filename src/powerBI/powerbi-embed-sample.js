const { PowerBIClient } = require('@azure/powerbi-client');
const { DefaultAzureCredential } = require('@azure/identity');

class PowerBIEmbedding {
  constructor(config) {
    this.workspaceId = config.workspaceId;
    this.reportId = config.reportId;
    this.client = null;
  }

  async initialize() {
    try {
      const credential = new DefaultAzureCredential();
      this.client = new PowerBIClient(credential);
    } catch (error) {
      console.error('Failed to initialize Power BI client:', error);
      throw error;
    }
  }

  async getEmbedToken() {
    try {
      const embedToken = await this.client.reports.generateToken(
        this.workspaceId,
        this.reportId,
        {
          accessLevel: 'View'
        }
      );
      return embedToken;
    } catch (error) {
      console.error('Failed to generate embed token:', error);
      throw error;
    }
  }

  async getReportConfig() {
    try {
      const report = await this.client.reports.getReport(
        this.workspaceId,
        this.reportId
      );
      
      const embedToken = await this.getEmbedToken();

      return {
        type: 'report',
        id: report.id,
        embedUrl: report.embedUrl,
        accessToken: embedToken.token,
        tokenType: embedToken.tokenType,
        settings: {
          navContentPaneEnabled: false,
          filterPaneEnabled: true
        }
      };
    } catch (error) {
      console.error('Failed to get report configuration:', error);
      throw error;
    }
  }

  async refreshReport() {
    try {
      await this.client.reports.refreshReport(
        this.workspaceId,
        this.reportId
      );
      console.log('Report refresh triggered successfully');
    } catch (error) {
      console.error('Failed to refresh report:', error);
      throw error;
    }
  }
}

module.exports = PowerBIEmbedding; 