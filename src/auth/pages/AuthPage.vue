<script setup lang="ts">
import { QForm } from 'quasar';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';

import { useAuth, useAuthMutation } from 'src/auth/composables';
import { useCookies } from 'src/shared/composables';
import { requiredField } from 'src/shared/helpers';

const { replace } = useRouter();
const loginForm = ref<QForm | null>(null);
const showPwd = ref(false);
const { login, vertical } = useAuth();
const { loginMutation } = useAuthMutation();
const { saveCredentials, saveUserData } = useCookies();

const onReset = () => {
  if (!loginForm.value) return;

  loginForm.value.resetValidation();
  loginMutation.reset();

  login.username = '';
  login.password = '';
};

const onSubmit = async () => {
  if (!loginForm.value) return;

  if (!(await loginForm.value.validate())) return;

  loginMutation.mutate(login);
};

watch(
  () => loginMutation.isSuccess.value,
  (success) => {
    if (success) {
      saveCredentials(login.username, login.password);
      if (loginMutation.data.value) {
        saveUserData(loginMutation.data.value);
        replace({ name: 'home-page', params: { username: loginMutation.data.value?.user.username } });
        onReset();
      }
    }
  }
);
</script>

<template>
  <q-page class="flex flex-center">
    <section class="container">
      <h1 class="q-ma-none text-grey-3 title" translate="no" draggable="false">Drello</h1>

      <q-separator :vertical="vertical" dark :class="!vertical && 'separator'" />

      <q-form @submit="onSubmit" class="form column justify-center items-center q-gutter-y-md" ref="loginForm">
        <q-input
          outlined
          dark
          color="secondary"
          type="text"
          label="Username *"
          class="full-width"
          v-model="login.username"
          lazy-rules
          :rules="[requiredField]"
          :readonly="loginMutation.isLoading.value"
        />
        <q-input
          outlined
          dark
          color="secondary"
          label="Password *"
          class="full-width"
          :type="showPwd ? 'text' : 'password'"
          v-model="login.password"
          lazy-rules
          :rules="[requiredField]"
          :readonly="loginMutation.isLoading.value"
        >
          <template v-slot:append>
            <q-btn
              flat
              round
              color="secondary"
              :icon="showPwd ? 'visibility' : 'visibility_off'"
              @click="showPwd = !showPwd"
            />
          </template>
        </q-input>

        <q-btn
          outline
          label="Login"
          color="secondary"
          padding=".8rem md"
          class="full-width text-overline"
          size="md"
          type="submit"
          :loading="loginMutation.isLoading.value"
        />
        <div class="error" :class="loginMutation.error.value && 'error-show'">
          {{ loginMutation.error.value?.message }}
        </div>
      </q-form>
    </section>
  </q-page>
</template>

<style lang="scss" scoped>
@include phone {
  .q-page {
    background: $primary;
  }

  .separator {
    width: 100%;
  }

  .container {
    width: 100%;
    height: 80vh;
    padding: 1rem;
    text-align: center;
    @include flex(column, space-evenly, center);
  }

  .form {
    width: 90%;
  }

  .error {
    background: rgba($negative, 0.5);
    border-radius: 0.2rem;
    color: #dedede;
    letter-spacing: 1px;
    width: 100%;
    &-show {
      padding: 1rem 0;
      transition: all 0.2s ease-in-out;
      @include fade-in();
    }
  }
}

@include tablet-portrait-up {
  .container {
    width: 40rem;
    // height: 30rem;
  }

  .separator {
    width: 80%;
  }

  .title {
    text-align: right;
  }

  .form {
    width: 70%;
  }
}

@include tablet-landscape-up {
  .container {
    width: 55rem;
    height: 30rem;
    @include flex($justify: space-evenly, $align: center);
  }

  .form {
    max-width: 25rem;
  }
}
</style>
