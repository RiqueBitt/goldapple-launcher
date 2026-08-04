<template>
  <v-dialog
    v-model="isShown"
    width="420"
  >
    <v-card
      v-if="updateInfo"
      outlined
    >
      <v-card-item>
        <v-card-title>
          {{ updateInfo.name }}
        </v-card-title>
        <v-card-subtitle>
          {{ t('launcherUpdate.newVersionAvailable') }}
        </v-card-subtitle>
      </v-card-item>
      <v-card-text
        v-if="shortDescription"
        class="update-description"
      >
        {{ shortDescription }}
      </v-card-text>
      <v-alert
        v-if="isAppX"
        variant="tonal"
        type="warning"
      >
        {{ t('setting.appxUpdateHint') }}
      </v-alert>
      <v-alert
        v-if="hintRedownload"
        variant="tonal"
        type="warning"
      >
        {{ t('setting.maunalUpdateHint') }}
      </v-alert>
      <v-card-actions>
        <v-spacer />
        <v-btn
          variant="text"
          :disabled="updating"
          @click="isShown = false"
        >
          {{ t('launcherUpdate.later') }}
        </v-btn>
        <v-btn
          v-if="!hintRedownload"
          color="primary"
          :loading="updating"
          @click="updateNow()"
        >
          <v-icon start>
            system_update
          </v-icon>
          {{ t('launcherUpdate.updateNow') }}
        </v-btn>
        <v-btn
          v-else
          color="primary"
          variant="text"
          @click="openGithub()"
        >
          <v-icon start>
            signpost
          </v-icon>
          {{ t('setting.githubRelease') }}
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-card
      v-else
      hover
      style="width: 100%"
      to="https://github.com/RiqueBitt/goldapple-launcher/releases"
      target="browser"
      push
    >
      <div class="m-8 flex h-full items-center justify-around">
        <h3 v-if="!checkingUpdate">
          {{ t('launcherUpdate.noUpdateAvailable') }}
        </h3>
        <v-progress-circular
          v-else
          indeterminate
        />
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang=ts setup>
import { kEnvironment } from '@/composables/environment'
import { kSettingsState, kUpdateSettings } from '@/composables/setting'
import { injection } from '@/util/inject'
import { useDialog } from '../composables/dialog'
import { useNotifier } from '@/composables/notifier'

const { isShown } = useDialog('update-info')
const { t } = useI18n()
const { state } = injection(kSettingsState)
const {
  installing, downloadingUpdate, checkingUpdate, updateInfo, updateStatus,
  downloadUpdate, quitAndInstall,
} = injection(kUpdateSettings)

const env = injection(kEnvironment)
const isAppX = computed(() => env.value?.env === 'appx')
// Descricao curta (a mensagem do commit do build), sem renderizar markdown —
// so um resumo simples do que mudou, nao o changelog inteiro.
const shortDescription = computed(() => {
  const raw = updateInfo.value?.body ?? ''
  const firstLine = raw.split('\n').find((l) => l.trim().length > 0) ?? ''
  return firstLine.slice(0, 200)
})
const hintRedownload = computed(() =>
  state.value?.updateInfo?.operation === 'manual',
)

// Um clique só: baixa (se ainda nao baixou) e, assim que terminar, ja fecha
// e reinicia instalando a versao nova. O usuario nao precisa clicar duas vezes.
const { notify } = useNotifier()
const updating = computed(() => downloadingUpdate.value || installing.value)

// Erros que cruzam do processo principal pro renderer passam por
// `getSerializedError` (xmcl-runtime/infra/errors/error_serialize.ts), que
// converte a Error real num objeto plano só com `message`/`name`/`stack` —
// ele NUNCA chega aqui como `instanceof Error`. O check antigo (`e instanceof
// Error ? e.message : String(e)`) sempre caia no `String(e)`, que produz
// "[object Object]" e esconde a causa real. Le o `message` direto do objeto
// (funciona tanto pro caso serializado quanto pro raro caso de já ser um
// Error de verdade), com fallback pra String(e) só se nem isso existir.
function extractErrorMessage(e: unknown): string {
  if (e && typeof e === 'object' && 'message' in e && typeof (e as any).message === 'string' && (e as any).message) {
    return (e as any).message
  }
  if (e instanceof Error) return e.message
  return String(e)
}

async function updateNow() {
  try {
    if (updateStatus.value === 'pending') {
      await downloadUpdate()
    }
    await quitAndInstall()
  } catch (e) {
    // Antes isso falhava em silencio (o botao so parava de girar e nada
    // acontecia). Agora mostra o erro real pra dar pra diagnosticar.
    console.error('[update] falhou ao atualizar', e)
    notify({
      level: 'error',
      title: t('launcherUpdate.updateFailed'),
      body: extractErrorMessage(e),
    })
  }
}

const openGithub = () => {
  window.open('https://github.com/RiqueBitt/goldapple-launcher/releases', 'browser')
}
</script>

<style scoped>
.update-description {
  padding-top: 0;
  padding-bottom: 8px;
  color: rgba(var(--v-theme-on-surface), 0.75);
  font-size: 13px;
}
</style>
