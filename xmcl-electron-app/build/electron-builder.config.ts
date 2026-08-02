/* eslint-disable no-template-curly-in-string */
import { config as dotenv } from 'dotenv'
import type { Configuration } from 'electron-builder'

dotenv()

export const config = {
  productName: 'Aurora Launcher',
  appId: 'com.aurora.launcher',
  directories: {
    output: 'build/output',
    buildResources: 'build',
    app: '.',
  },
  protocols: {
    name: 'Aurora',
    schemes: ['aurora'],
  },
  // assign publish for auto-updater
  // TROQUE "SEU-USUARIO" pelo seu usuário/organização do GitHub e
  // "aurora-launcher" pelo nome do seu repositório.
  publish: [{
    provider: 'github',
    owner: 'RiqueBitt',
    repo: 'aurora-launcher',
  }],
  files: [{
    from: 'dist',
    to: '.',
    filter: ['**/*.js', '**/*.ico', '**/*.png', '**/*.webp', '**/*.svg', '*.node', '*.dll', '**/*.html', '**/*.css', '**/*.woff2', '**/*.wasm'],
  }, {
    from: '.',
    to: '.',
    filter: 'package.json',
  }],
  artifactName: 'aurora-launcher-${version}-${platform}-${arch}.${ext}',
  appx: {
    displayName: 'Aurora Launcher',
    applicationId: 'AuroraLauncher',
    identityName: 'AuroraLauncher',
    backgroundColor: 'transparent',
    publisher: process.env.PUBLISHER,
    publisherDisplayName: 'Aurora',
    setBuildNumber: true,
  },
  dmg: {
    artifactName: 'xmcl-${version}-${arch}.${ext}',
    contents: [
      {
        x: 410,
        y: 150,
        type: 'link',
        path: '/Applications',
      },
      {
        x: 130,
        y: 150,
        type: 'file',
      },
    ],
  },
  mac: {
    icon: 'icons/dark.icns',
    darkModeSupport: true,
    target: [
      {
        target: 'dmg',
        arch: ['arm64', 'x64'],
      },
    ],
    extendInfo: {
      NSMicrophoneUsageDescription: 'A Minecraft mod wants to access your microphone.',
      NSCameraUsageDescription: 'Please give us access to your camera',
      'com.apple.security.device.audio-input': true,
      'com.apple.security.device.camera': true,
    },
  },
  win: {
    certificateFile: undefined as string | undefined,
    publisherName: 'Aurora',
    icon: 'icons/dark.ico',
    electronLanguages: ['en-US'],
    target: [
      {
        // Gera o instalador .exe tradicional (NSIS), além do zip.
        target: 'nsis',
        arch: [
          'x64',
        ],
      },
      {
        target: 'zip',
        arch: [
          'x64',
          'ia32',
        ],
      },
    ],
  },
  nsis: {
    artifactName: 'aurora-launcher-setup-${version}.${ext}',
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
  },
  linux: {
    executableName: 'xmcl',
    electronLanguages: ['en-US'],
    desktop: {
      MimeType: 'x-scheme-handler/xmcl',
      StartupWMClass: 'xmcl',
    },
    category: 'Game',
    icon: 'icons/dark.icns',
    artifactName: 'xmcl-${version}-${arch}.${ext}',
    target: [
      { target: 'deb', arch: ['x64', 'arm64'] },
      { target: 'rpm', arch: ['x64', 'arm64'] },
      { target: 'AppImage', arch: ['x64', 'arm64'] },
      { target: 'tar.xz', arch: ['x64', 'arm64'] },
      { target: 'pacman', arch: ['x64', 'arm64'] },
    ],
  },
  snap: {
    publish: [
      'github',
    ],
  },
} satisfies Configuration
