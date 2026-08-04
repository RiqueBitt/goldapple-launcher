import { LauncherAppPlugin } from '@xmcl/runtime/app'
import { autoUpdater } from 'electron-updater'
import { kSettings } from '~/settings'

export const pluginAutoUpdate: LauncherAppPlugin = async (app) => {
  // E2E hook: skip the auto-updater entirely when running under Playwright.
  // The updater hits real network endpoints and would otherwise add nondeterminism.
  if (process.env.XMCL_E2E) {
    return
  }

  // The installer isn't code-signed (no Authenticode cert). On Windows,
  // NsisUpdater otherwise runs an Authenticode check on the downloaded file
  // and compares its publisher against `win.publisherName` in
  // electron-builder.config.ts — with no signature at all that check always
  // fails with "New version is not signed by the application owner" and
  // blocks the install even though the download itself succeeded. Setting
  // this on electron-builder's `win` config already disables it for a fresh
  // build, but set it here too so it's guaranteed at runtime regardless of
  // what shipped in a given build's embedded update metadata.
  autoUpdater.verifyUpdateCodeSignature = false

  const state = await app.registry.get(kSettings)
  state.subscribe('autoInstallOnAppQuitSet', (value) => {
    autoUpdater.autoInstallOnAppQuit = value
  }).subscribe('allowPrereleaseSet', (value) => {
    autoUpdater.allowPrerelease = value
  }).subscribe('autoDownloadSet', (value) => {
    autoUpdater.autoDownload = value
  }).subscribe('config', (config) => {
    autoUpdater.autoInstallOnAppQuit = config.autoInstallOnAppQuit
    autoUpdater.allowPrerelease = config.allowPrerelease
    autoUpdater.autoDownload = config.autoDownload
  })
}
