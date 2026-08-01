# Aurora Launcher — guia rápido

Este projeto é um fork rebrandizado do **X Minecraft Launcher** (MIT license),
renomeado para "Aurora Launcher". Todas as funcionalidades originais foram
mantidas (mods, modpacks, CurseForge/Modrinth, multiplayer, contas, etc).

## O que foi alterado

- Nome exibido em toda a interface: `X Minecraft Launcher` → `Aurora Launcher`
- `appId`, protocolo customizado (`xmcl://` → `aurora://`) e identificadores do pacote Windows
- Nome dos arquivos gerados: `aurora-launcher-...`
- **Adicionado o target NSIS**, que gera um instalador `.exe` tradicional pro Windows
  (o projeto original só gerava `.zip` e `.appx`)
- Novo workflow simplificado: `.github/workflows/build-windows-exe.yml`

## Antes de gerar o .exe, troque:

1. Em `xmcl-electron-app/build/electron-builder.config.ts`:
   - `owner: 'SEU-USUARIO'` e `repo: 'aurora-launcher'` pelo seu usuário/repo do GitHub
2. Ícones em `xmcl-electron-app/icons/` (opcional — pode manter os originais por enquanto)
3. Se quiser trocar o nome "Aurora Launcher" por outro, use busca e substituição
   pelo termo `Aurora Launcher` nesses arquivos:
   - `xmcl-electron-app/build/electron-builder.config.ts`
   - `xmcl-keystone-ui/src/index.html` e `multiplayer.html`
   - `xmcl-electron-app/package.json`, `xmcl-keystone-ui/package.json`, `package.json`

## Como gerar o .exe (recomendado: GitHub Actions, sem precisar instalar nada)

1. Crie um repositório novo no GitHub (ex: `aurora-launcher`)
2. Suba este projeto para lá:
   ```bash
   git init
   git add .
   git commit -m "Aurora Launcher"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/aurora-launcher.git
   git push -u origin main
   ```
3. Vá na aba **Actions** do repositório no GitHub
4. Rode o workflow **"Build Windows EXE (Aurora Launcher)"** manualmente
   (botão "Run workflow"), ou apenas espere — ele roda sozinho a cada push
5. Quando terminar (~15-25 min), baixe o artefato `aurora-launcher-windows-installer`
   — dentro dele está o `.exe`

## Build local (alternativa, precisa de Windows)

Se preferir gerar na sua própria máquina Windows:
```bash
npm i -g pnpm
pnpm install
pnpm run --prefix xmcl-keystone-ui build
pnpm run --prefix xmcl-electron-app build
```
O instalador sai em `xmcl-electron-app/build/output/*.exe`

## Aviso sobre o Windows SmartScreen

Como o instalador não é assinado digitalmente (certificados de assinatura de
código custam ~200−400 USD/ano), o Windows vai mostrar um aviso de "editor
desconhecido" na primeira execução. Isso é normal para apps não-comerciais;
o usuário pode clicar em "Mais informações" → "Executar assim mesmo".
