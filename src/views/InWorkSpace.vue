<template></template>
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
  private inworkspace() {
    firestore
      .collection("workspace")
      .doc(this.workspace)
      .get()
      .then(doc => {
        doc.owner;
      });
  }
}
</script>
<style lang="scss" scoped>
</style>