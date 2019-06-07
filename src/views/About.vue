<template>
  <div class="about">
    <div class="box">
      <div class="media">
        <figure class="image is-64x64 media-left">
          <img class="is-rounded" :src="user.photoURL">
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{ user.uid }} </strong> <small>{{ user.email }} </small>
              <br>
              {{ user.uid }}
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <a class="level-item">
                <span class="icon is-small"><i class="fas fa-reply"></i></span>
              </a>
              <a class="level-item">
                <span class="icon is-small"><i class="fas fa-retweet"></i></span>
              </a>
              <a class="level-item">
                <span class="icon is-small"><i class="fas fa-heart"></i></span>
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
    <footer class="footer">
    </footer>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator';
@Component({})
export default class template extends Vue {
  user() {
      return this.$store.getters.user;
}
}
</script>
<style lang="scss" scoped>
</style>
