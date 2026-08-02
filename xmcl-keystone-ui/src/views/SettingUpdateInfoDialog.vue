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

const { isShown } = useDialog('update-info')
const { t } = useI18n()
const { state } = injection(kSettingsState)
const {
  installing, downloadingUpdate, checkingUpdate, updateInfo, updateStatus,
  downloadUpdate, quitAndInstall,
} = injection(kUpdateSettings)

const env = injection(kEnvironment)
const isAppX = computed(() => env.value?.env === 'appx')
const hintRedownload = computed(() =>
  state.value?.updateInfo?.operation === 'manual',
)

// Um clique só: baixa (se ainda nao baixou) e, assim que terminar, ja fecha
// e reinicia instalando a versao nova. O usuario nao precisa clicar duas vezes.
const updating = computed(() => downloadingUpdate.value || installing.value)
async function updateNow() {
  if (updateStatus.value === 'pending') {
    await downloadUpdate()
  }
  await quitAndInstall()
}

const openGithub = () => {
  window.open('https://github.com/RiqueBitt/goldapple-launcher/releases', 'browser')
}
</script>

<style>
</style>
