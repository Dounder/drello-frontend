<script setup lang="ts">
import { ref } from 'vue';
import CircleComponent from 'src/modules/shared/components/CircleComponent.vue';
import CrossComponent from 'src/modules/shared/components/CrossComponent.vue';
import CardBackground from '../components/CardBackground.vue';
import { QForm } from 'quasar';

const username = ref<string | null>(null);
const password = ref<string | null>(null);
const form = ref<QForm>();

const onSubmit = () => {
  if (!form.value) return;

  if (!form.value.validate()) return;

  console.log({ username: username.value, password: password.value });

  onReset();
};

const onReset = () => {
  if (!form.value) return;

  username.value = null;
  password.value = null;
  form.value.resetValidation();
};
</script>

<template>
  <q-page>
    <article class="card">
      <h2 class="card-title" translate="no">Log In</h2>
      <q-form @submit="onSubmit" @reset="onReset" class="card-form" ref="form">
        <q-input
          dark
          standout="bg-dark text-white"
          input-class="text-white"
          class="full-width"
          color="white"
          v-model="username"
          type="text"
          label="Username"
          no-error-icon
          lazy-rules
          :rules="[(val) => !!val || 'Username required']"
        />
        <q-input
          dark
          standout="bg-dark text-white"
          input-class="text-white"
          class="full-width"
          color="white"
          v-model="password"
          type="text"
          label="Password"
          no-error-icon
          lazy-rules
          :rules="[(val) => !!val || 'Password required']"
        />
        <q-btn rounded flat class="card-form__btn" text-color="white" label="log in" type="submit">
          <q-icon class="q-pl-sm" color="white" name="o_login" />
        </q-btn>
      </q-form>
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
    margin-top: 2rem;
    letter-spacing: 1px;
    transition: all 0.5s ease;
    z-index: 1;
    &:hover {
      opacity: 1;
      transition: all 0.5s ease;
    }
  }
}
</style>
