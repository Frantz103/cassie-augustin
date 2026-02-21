import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'gcavgznf',
    dataset: 'production'
  },
  studioHost: 'cassie-augustin',
  deployment: {
    appId: 'frwq1i4senhe8s3si4ks22t4',
    autoUpdates: true,
  }
})
