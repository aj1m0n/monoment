<template>
  <div>
    <div class="control">
      <textarea class="textarea" placeholder="workspace" v-model="workspace"></textarea>
    </div>
    <div class="control">
      <button class="button is-link" @click="createworkspace">Submit</button>
    </div>
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
export default class template extends Vue {
  private workspace: string = "";
  private createworkspace() {
    firestore
      .collection("workspace")
      .doc(this.workspace)
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
        } else {
          firestore
            .collection("workspace")
            .doc(this.workspace)
            .set({
              owner: this.$store.getters.user.uid,
              member: [this.$store.getters.user.uid]
            });
          firestore
            .collection("users")
            .doc(this.$store.getters.user.uid)
            .update({
              workspace: firebase.firestore.FieldValue.arrayUnion(
                this.workspace
              ),
              updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            })
            .then(() => {
              alert("Document successfully updated!");
            });
          this.$router.push("/Home");
        }
      });
  }
}
</script>
<style lang="scss" scoped>
</style>