<template>
  <div class="home">
    <h1 class="title is-5">welcome to monoment</h1>
    <div class="greeting">
      <h1 class="title is-6">Hello, {{displayName}}.</h1>
    </div>
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <textarea class="textarea" placeholder="Enter name" v-model="name"></textarea>
      </div>
    </div>
    <div class="field">
      <label class="label">Preview</label>
      <div class="control">
        <div v-html="sanitizedProfile" class="preview"></div>
      </div>
    </div>
    <div class="field">
      <div class="control">
        <button class="button is-link" @click="save">Submit</button>
      </div>
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
import firestore from "@/firestore";
import firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { Component, Vue } from "vue-property-decorator";
import UserDataType from "@/types/UserDataType";

@Component({})
export default class home extends Vue {
  private name: string = "";
  private debouncedSanitize: any = null;
  private sanitizedProfile: string = "";
  private selectedFile: any = null;
  private imageUrl: string = "";
  private workspace: string = "";
  private created() {
    firestore
      .collection("users")
      .doc(this.$store.getters.user.uid)
      .get()
      .then(doc => {
        const userData = doc.data();
        if (doc && userData) {
          this.name = userData.name;
        }
      });
  }
  private save() {
    firestore
      .collection("users")
      .doc(this.$store.getters.user.uid)
      .update({
        name: this.name,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        alert("Document successfully updated!");
      });
  }
  private async updateSanitizedProfile() {
    const sanitizeFunc = firebase.functions().httpsCallable("sanitize");
    const response = await sanitizeFunc({ text: this.name });
    this.sanitizedProfile = response.data.sanitizedText;
  }

  private signOut() {
    this.$store.dispatch("signOut");
    this.$router.push("/signin");
  }
  private selectFile(e: any): void {
    this.selectedFile = e.target.files[0];
  }
  private workspacein() {
    this.$router.push("/inworkspace");
  }
  private WorkSpaceOut() {}
  private CrateWorkSpace() {
    this.$router.push("/crateworkspace");
  }

  get displayName(): string {
    return this.$store.getters.user.name || "Nameless";
  }
}
</script>
