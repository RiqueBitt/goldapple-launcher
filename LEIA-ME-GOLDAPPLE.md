# GoldApple Launcher — guia rápido

Este projeto é um fork rebrandizado do **X Minecraft Launcher** (MIT license),
renomeado para "GoldApple Launcher". Todas as funcionalidades originais foram
mantidas (mods, modpacks, CurseForge/Modrinth, multiplayer, contas, etc).

## O que foi alterado

- Nome exibido em toda a interface: `X Minecraft Launcher` → `GoldApple Launcher`
- `appId`, protocolo customizado (`xmcl://` → `goldapple://`) e identificadores do pacote Windows
- Ícones substituídos pela maçã dourada em todos os formatos (`.ico`, `.icns`, tiles do Windows)
- Nome dos arquivos gerados: `goldapple-launcher-...`
- **Target NSIS**, que gera um instalador `.exe` tradicional pro Windows
  (o projeto original só gerava `.zip` e `.appx`)
- Workflow do GitHub Actions: `.github/workflows/build-windows-exe.yml`
  (builda o `.exe`, versiona o build e publica como Release automaticamente)

## Como gerar o .exe (recomendado: GitHub Actions, sem precisar instalar nada)

1. Suba este projeto para o seu repositório no GitHub
2. Vá na aba **Actions** do repositório no GitHub
3. Rode o workflow **"Build Windows EXE (GoldApple Launcher)"** manualmente
   (botão "Run workflow"), ou apenas espere — ele roda sozinho a cada push
4. Quando terminar (~15-25 min), a Release mais recente vai ter o `.exe` pronto
   pra baixar (aba **Releases** do repositório)

## Build local (alternativa, precisa de Windows)

Se preferir gerar na sua própria máquina Windows:
```bash
npm i -g pnpm
pnpm install
pnpm run --prefix xmcl-keystone-ui build
set RELEASE=true
pnpm run --prefix xmcl-electron-app build
```
O instalador sai em `xmcl-electron-app/build/output/*.exe`

## Aviso sobre o Windows SmartScreen

Como o instalador não é assinado digitalmente (certificados de assinatura de
código custam ~200−400 USD/ano), o Windows vai mostrar um aviso de "editor
desconhecido" na primeira execução. Isso é normal para apps não-comerciais;
o usuário pode clicar em "Mais informações" → "Executar assim mesmo".
