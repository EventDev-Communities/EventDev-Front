import { execSync } from 'child_process'

const blockedFiles = ['.vscode/settings.json', '.env', '.husky/pre-commit', '.husky/commit-msg']

try {
  const stagedFiles = execSync('git diff --cached --name-only', { encoding: 'utf-8' }).trim().split('\n').filter(Boolean)

  const foundBlockedFiles = stagedFiles.filter((file) => blockedFiles.includes(file))

  if (foundBlockedFiles.length > 0) {
    console.error('✖ Forbidden files staged')
    process.exit(1)
  }

  process.exit(0)
} catch (error) {
  process.exit(0)
}
