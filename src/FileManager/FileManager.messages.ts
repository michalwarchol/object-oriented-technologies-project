export default {
  resourcesStart: 'Creating resources directory...',
  resourcesError: 'Failed to create resources directory!',
  resourcesSuccess: 'Resources directory has been created!',
  fileNotExist: `File doesn't exist!`,
  errorReadFile: (message: string) => `Error occured during reading a file: ${message}`,
  errorWriteFile: (message: string) => `Error occured during writing into a file: ${message}`
}