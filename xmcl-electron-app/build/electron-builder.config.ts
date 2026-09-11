/* eslint-disable no-template-curly-in-string */
import { config as dotenv } from 'dotenv'
import type { Configuration } from 'electron-builder'

dotenv()

export const config = {
  productName: 'ProjectMC',
  appId: 'com.projectclub.projectmc',
  directories: {
    output: 'build/output',
    buildResources: 'build',
    app: '.',
  },
  protocols: {
    name: 'ProjectMC',
    schemes: ['projectmc'],
  },
  // assign publish for auto-updater
  // O codigo-fonte (este repositorio) e privado. O electron-updater precisa
  // de um lugar PUBLICO pra checar/baixar update sem autenticacao, entao os
  // releases (.exe/.yml) sao publicados num repositorio separado
  // (goldapple-launcher-releases) que so serve pra isso — sem codigo nenhum
  // nele. Veja .github/workflows/build-windows-exe.yml pra ver como o build
  // publica la, e xmcl-electron-app/main/utils/updater.ts (GITHUB_OWNER /
  // GITHUB_REPO) que confirma se o instalador ja terminou de subir antes de
  // avisar o usuario.
  publish: [{
    provider: 'github',
    owner: 'RiqueBitt',
    repo: 'goldapple-launcher-releases',
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
  artifactName: 'goldapple-launcher-${version}-${platform}-${arch}.${ext}',
  appx: {
    displayName: 'ProjectMC',
    applicationId: 'ProjectMC',
    identityName: 'ProjectMC',
    backgroundColor: 'transparent',
    publisher: process.env.PUBLISHER,
    publisherDisplayName: 'Project Club',
    setBuildNumber: true,
  },
  dmg: {
    artifactName: 'goldapple-launcher-${version}-${arch}.${ext}',
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
    publisherName: 'Project Club',
    // O instalador NÃO é assinado digitalmente (não tem certificado de code
    // signing — custa dinheiro, não configuramos ainda). Por padrão, o
    // NsisUpdater do electron-updater roda uma verificação Authenticode no
    // .exe baixado e compara o "publisher" com `publisherName` acima; sem
    // assinatura nenhuma, essa verificação SEMPRE falha com "New version
    // is not signed by the application owner" e trava a instalação mesmo
    // com o download 100% correto. Desliga essa checagem específica (ela só
    // faz sentido quando existe assinatura de verdade pra comparar).
    verifyUpdateCodeSignature: false,
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
      // Item pedido (Project Club): "criar uma pasta com o .exe do
      // launcher... em vez de baixar vários arquivos, baixar o .exe...
      // quando clicar em jogar ele abre o .exe" — um único .exe
      // portátil (sem instalador, sem pasta cheia de DLLs/app.asar pra
      // baixar e extrair na mão do lado de fora) que se auto-extrai
      // sozinho pro %LOCALAPPDATA%\Temp na hora de abrir, usando o
      // próprio mecanismo do NSIS (muito mais testado que qualquer
      // download+extração+verificação feita por fora). Resolve de vez
      // a origem de praticamente todos os problemas de "pacote
      // corrompido" enfrentados: não tem mais zip nem app.asar pra
      // baixar/verificar do lado de fora — só um arquivo.
      {
        target: 'portable',
        arch: ['x64'],
      },
    ],
  },
  nsis: {
    artifactName: 'goldapple-launcher-setup-${version}.${ext}',
    oneClick: false,
    allowToChangeInstallationDirectory: true,
    createDesktopShortcut: true,
    createStartMenuShortcut: true,
  },
  portable: {
    artifactName: 'projectmc-portable-${version}.${ext}',
  },
  linux: {
    executableName: 'xmcl',
    electronLanguages: ['en-US'],
    desktop: {
      MimeType: 'x-scheme-handler/xmcl',
      StartupWMClass: 'xmcl',
    },
    category: 'Game',
    icon: 'icons/dark-linux.png',
    artifactName: 'goldapple-launcher-${version}-${arch}.${ext}',
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
