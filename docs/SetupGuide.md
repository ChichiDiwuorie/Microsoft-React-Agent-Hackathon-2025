# Setup Guide

## Prerequisites
- Node.js 18.x or higher
- Microsoft 365 Developer Account
- Azure Subscription
- Power Platform License
- Git

## Installation Steps

### 1. Clone the Repository
```bash
git clone <repository-url>
cd energenius
```

### 2. Configure Azure AD
1. Create a new Azure AD application
2. Copy `config/azure-ad-config.json.template` to `config/azure-ad-config.json`
3. Update with your Azure AD credentials

### 3. Set Up Environment Variables
1. Copy `.env.sample` to `.env`
2. Update the following variables:
   - AZURE_CLIENT_ID
   - AZURE_TENANT_ID
   - POWERBI_WORKSPACE_ID
   - M365_APP_ID

### 4. Install Dependencies
```bash
npm install
```

### 5. Configure Power BI
1. Create a Power BI workspace
2. Import the sample reports
3. Update the workspace ID in configuration

### 6. Set Up Power Automate
1. Import the sample flows
2. Configure connections
3. Update flow triggers

### 7. Configure Microsoft Teams
1. Register the bot
2. Set up notification channels
3. Configure webhook URLs

## Running the Application

### Development Environment
```bash
npm run dev
```

### Production Environment
```bash
npm run build
npm start
```

## Troubleshooting

### Common Issues
1. Authentication errors
   - Verify Azure AD configuration
   - Check token expiration

2. Power BI connection issues
   - Confirm workspace permissions
   - Validate embed tokens

3. Teams integration problems
   - Check bot registration
   - Verify webhook URLs

## Support
For additional support, contact the development team or refer to our documentation. 