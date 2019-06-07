<template>
  <div class="sign-in">
    <h1 class="title is-5">welcome to monoment</h1>
    <h1 class="title is-5">Sign in</h1>
    <div id="firebaseui-auth-container"></div>
  </div>
</template>

<script lang="ts">
import firebase from "firebase/app";
import firestore from "@/firestore";
import firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { Component, Vue } from "vue-property-decorator";
import UserDataType from "@/types/UserDataType";

@Component({})
export default class SignIn extends Vue {
  private mounted() {
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    ui.start("#firebaseui-auth-container", {
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          this.saveUser(authResult.user).then(() => {
            this.$router.push("/home");
          });
          return false;
        }
      },
      signInFlow: "redirect",
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    });
  }
  private async saveUser(user: firebase.User) {
    const userRef = firestore.collection("users").doc(user.uid);
    const userDoc = await userRef.get();
    const userData: UserDataType = {};
    if (!userDoc.exists) {
      userData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
    }
    userRef.set(userData, { merge: true });
  }
}
</script>
<style scoped>
.greeting {
  text-align: center;
}
.preview {
  height: 300px;
  overflow: scroll;
  border: solid 1px #aaa;
  border-radius: 3px;
  padding: 10px;
}
.image {
  max-width: 300px;
  max-height: 300px;
}
</style>