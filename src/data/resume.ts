import type { ResumeResource } from '../types/portfolio'

export const resume = {
  title: 'Resume PDF',
  description: 'Add a verified PDF to public/resume/ and set its path here when it is ready to share.',
  filePath: undefined,
  lastUpdated: undefined,
} satisfies ResumeResource
