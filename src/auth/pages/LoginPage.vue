<script setup lang="ts">
import { QForm } from 'quasar';
import { CircleComponent, CrossComponent } from 'src/shared/components';
import { requiredString } from 'src/shared/helpers';
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import CardBackground from '../components/CardBackground.vue';
import useAuth from '../composables/useAuth';
import useAuthMutation from '../composables/useAuthMutation';

const { getError, getErrorMessage } = useAuth();
const { loginMutation } = useAuthMutation();
const router = useRouter();

const loginForm = ref({ username: 'admin', password: 'Aa1234!' });
const isPwd = ref<boolean>(true);
const form = ref<QForm>();

const onSubmit = async () => {
  if (!form.value) return;

  if (!form.value.validate()) return;

  loginMutation.mutate(loginForm.value);
};

watch(
  () => loginMutation.isSuccess.value,
  (isSuccess: boolean) => {
    if (isSuccess) {
      loginForm.value = { username: '', password: '' };
      loginMutation.reset();
      form.value?.resetValidation();
      router.replace({ name: 'home-page' });
    }
  }
);
</script>

<template>
  <q-page>
    <article class="card">
      <h2 class="card-title" translate="no">Log In</h2>
      <q-form @submit="onSubmit" class="card-form" ref="form">
        <q-input
          dark
          standout
          class="full-width"
          color="dark"
          v-model="loginForm.username"
          type="text"
          label="Username"
          no-error-icon
          lazy-rules
          :rules="[requiredString]"
        />
        <q-input
          dark
          standout
          color="dark"
          class="full-width"
          label="Password"
          v-model="loginForm.password"
          :type="isPwd ? 'password' : 'text'"
          no-error-icon
          lazy-rules
          :rules="[requiredString]"
        >
          <template v-slot:append>
            <q-btn
              flat
              round
              style="opacity: 0.5"
              :icon="isPwd ? 'o_visibility_off' : 'o_visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <q-btn rounded flat class="card-form__btn" text-color="white" label="log in" type="submit" />
      </q-form>
      <article class="card-error" :class="getError ? 'active' : 'inactive'">
        {{ getErrorMessage }}
      </article>
      <router-link class="card-link" :to="{ name: 'forgot-password' }">FORGOT YOUR PASSWORD?</router-link>

      <CardBackground />
      <CrossComponent :index="2" size="3rem" top="5rem" left="5rem" />
      <CircleComponent :index="1" size="8rem" bottom="5rem" left="5rem" />
    </article>
  </q-page>
</template>

<style lang="scss" scoped>
%card {
  box-shadow: 0 0 1rem 1px $dark;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 1rem;
}
.q-page {
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(
    to left bottom,
    #051937,
    #062140,
    #06284a,
    #053153,
    #03395d,
    #024165,
    #01496c,
    #005174,
    #005b7b,
    #006480,
    #006e85,
    #007789
  );
  overflow: hidden;
  display: grid;
  place-items: center;
}
.card {
  @extend %card;
  width: 60rem;
  height: 40rem;
  background: $dark;
  position: relative;
  overflow: hidden;
  &-title {
    margin: 0 0 2rem;
    font-weight: 600;
    letter-spacing: 1px;
    font-style: italic;
    opacity: 0.8;
    user-select: none;
  }
  &-form {
    @extend %card;
    width: 40%;
    background: lighten($dark, 10);
    padding: 2rem;
    gap: 1rem;
    z-index: 1;
    &__btn {
      background: $dark;
      width: 10rem;
    }
  }
  &-link {
    opacity: 0.6;
    color: $white;
    letter-spacing: 1px;
    transition: all 0.5s ease;
    z-index: 1;
    &:hover {
      opacity: 1;
      transition: all 0.5s ease;
    }
  }
  &-error {
    width: 20rem;
    border-radius: 1rem;
    display: grid;
    place-items: center;
    border: 1px solid $negative;
    background: rgba($negative, 0.5);
    z-index: 1;
    transition: all 0.5s ease;
    &.inactive {
      height: 0;
      margin: 0;
      padding: 1rem;
      visibility: hidden;
      opacity: 0;
    }
    &.active {
      height: 5rem;
      margin: 1rem 0;
      padding: 1rem;
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
