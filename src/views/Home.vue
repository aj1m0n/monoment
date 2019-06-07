<template>
  <div class="home">
    <h1 class="title is-5">welcome to monoment</h1>
    <div class="greeting">
      <h1 class="title is-6">Hello, {{displayName}}.</h1>
    </div>
    <button class="button is-primary" @click="signOut">
      <strong>Sign out</strong>
    </button>
  </div>
</template>

<script lang="ts">
import "firebase/functions";
import "firebase/storage";

import firebase from "firebase/app";
import firestore from "firebase/firestore";
import firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { Component, Vue } from "vue-property-decorator";
import UserDataType from "@/types/UserDataType";

@Component({})
export default class home extends Vue {
  private profile: string = "";
  private debouncedSanitize: any = null;
  private sanitizedProfile: string = "";
  private selectedFile: any = null;
  private imageUrl: string = "";

  private signOut() {
    this.$store.dispatch("signOut");
    this.$router.push("/signin");
  }
  private selectFile(e: any): void {
    this.selectedFile = e.target.files[0];
  }
  get displayName(): string {
    return this.$store.getters.user.name || "Nameless";
  }
}
</script>
