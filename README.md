<p align="center">
  <img alt="ProjectMC" width="100" src="https://raw.githubusercontent.com/RiqueBitt/goldapple-launcher/main/xmcl-electron-app/icons/dark@256x256.png">
</p>

<h1 align="center">ProjectMC</h1>

<p align="center">
  Um jeito melhor de jogar Minecraft: gerencie instâncias, mods, modpacks e contas em um só lugar.
</p>

<p align="center">
  <a href="https://github.com/RiqueBitt/goldapple-launcher/actions/workflows/build-windows-exe.yml">
    <img src="https://github.com/RiqueBitt/goldapple-launcher/actions/workflows/build-windows-exe.yml/badge.svg" alt="Build Windows EXE">
  </a>
  <a href="https://github.com/RiqueBitt/goldapple-launcher/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License">
  </a>
  <a href="https://github.com/RiqueBitt/goldapple-launcher/releases/latest">
    <img src="https://img.shields.io/github/v/release/RiqueBitt/goldapple-launcher" alt="Release">
  </a>
</p>

## Sobre

ProjectMC é um launcher de Minecraft com suporte a múltiplas instâncias,
mods, modpacks (CurseForge e Modrinth), contas e multiplayer P2P.

## Download

Baixe a versão mais recente na aba [Releases](https://github.com/RiqueBitt/goldapple-launcher/releases/latest)
deste repositório. O instalador `.exe` (Windows) é gerado automaticamente a
cada push via GitHub Actions.

## Features

- 📥 **Download automático**: baixa e instala `Minecraft`, `Forge`, `Fabric`, `Quilt`, `OptiFine` e `JVM` de espelhos oficiais ou de terceiros.
- ⚡️ **Downloads rápidos**: reaproveita conexões HTTP/HTTPS e baixa arquivos em partes, em paralelo.
- 💻 **Multiplataforma**: baseado em Electron, roda em Windows 10/11, macOS e Linux.
- 🗂 **Multi-instâncias**: crie instâncias isoladas com versões, mods e configurações diferentes.
- 🔥 **CurseForge e Modrinth**: baixe mods e modpacks direto pelo launcher, com importação/exportação com compatibilidade.
- 🔒 **Múltiplas contas**: login Microsoft, Mojang Yggdrasil, e suporte a servidores de autenticação de terceiros (ely.by, littleskin.cn e outros).
- 🔗 **Multiplayer P2P**: jogue em rede mesmo sem estar na mesma rede física.

## Build local

```bash
npm i -g pnpm
pnpm install
pnpm run --prefix xmcl-keystone-ui build
pnpm run --prefix xmcl-electron-app build
```

O instalador sai em `xmcl-electron-app/build/output/`.

Veja também [LEIA-ME-GOLDAPPLE.md](LEIA-ME-GOLDAPPLE.md) para o guia de build via GitHub Actions.

## Créditos

Este projeto é um fork do [X Minecraft Launcher](https://github.com/Voxelum/x-minecraft-launcher)
(MIT License), rebrandizado como ProjectMC. Todo o crédito pela base do
código original vai para os autores e colaboradores do X Minecraft Launcher.

## Licença

[MIT](LICENSE)
