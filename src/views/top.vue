<template>
  <div>
    <p></p>
    <div @click="retal" class="button">
      <h2>rental</h2>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from "vue-property-decorator";
import { auth, db } from "../firebase";
import firebase from "firebase";
@Component({})
export default class Login extends Vue {}
</script>
<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.button {
  margin-top: 3rem;
  width: 180px;
  height: 60px;
  border-radius: 40px;
  background: linear-gradient(#c21500, #ffc500);
  color: #fff;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  flex-direction: column;
  box-shadow: 0px 0px 12px 3px rgba(0, 0, 0, 0.2);
  h2 {
    padding: 0;
    margin: 0;
  }
  p {
    padding: 0;
    margin: 0;
    font-size: 0.8rem;
  }
}
.button:hover {
  background: linear-gradient(#b80500, #f0b800);
}
.button:active {
  box-shadow: none;
}
</style>