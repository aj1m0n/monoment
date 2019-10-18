<template>
  <div>
    <quagga-scanner :onDetected="logIt" :readerSize="readerSize" :readerTypes="['ean_reader']"></quagga-scanner>
  </div>
</template>
<script lang="ts">
import "firebase/functions";
import "firebase/storage";

import firebase from "firebase/app";
import firestore from "@/firestore";
import firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import { Component } from "vue-property-decorator";
import Vue from "vue";
import QuaggaScanner from "@/components/scanner.vue";
import UserDataType from "@/types/UserDataType";

@Component({
  components: {
    QuaggaScanner
  }
})
export default class rental extends Vue {
  private readerSize: any = {
    width: 640,
    height: 480
  };
  private ditecoteds: any = [];
  public logIt(data: any) {
    console.log();
  }
}
</script>
<style lang="scss" scoped>
</style>