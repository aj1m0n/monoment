<template>
  <div class="dialog modal is-active" v-if="active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <!-- カメラの映像を表示させるDIV -->
      <div id="camera-area" class="camera-area"></div>
    </div>
    <!-- 右上の閉じるボタン -->
    <button class="modal-close is-large" aria-label="close" @click.prevent.stop="onClickCancel"></button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch, Emit } from "vue-property-decorator";
import VueQuagga from "vue-quaggajs";
Vue.use(VueQuagga);
@Component({})
export default class ModalReader extends Vue {
  @Prop({ required: true }) active!: boolean;

  // QuaggaJSのインスタンス
  private Quagga: any;

  /**
   * Vueインスタンス破棄時、カメラを起動していたらストップする
   */
  destroyed() {
    if (!!this.Quagga) this.Quagga.stop();
  }

  // ****************************************************
  // * methods
  // ****************************************************
  /**
   * Quaggaの初期化処理
   */
  private initQuagga() {
    // requireで読み込み
    this.Quagga = require("quagga");

    // バーコード検出時の処理を設定
    this.Quagga.onDetected(this.onDetected);

    // Quaggaの設定項目
    const config = {
      // カメラの映像の設定
      inputStream: {
        type: "LiveStream",
        // カメラ映像を表示するHTML要素の設定
        target: document.querySelector("#camera-area"),
        // バックカメラの利用を設定. (フロントカメラは"user")
        constraints: { facingMode: "environment" },
        // 検出範囲の指定: 上下30%は対象外
        area: { top: "30%", right: "0%", left: "0%", bottom: "30%" }
      },
      // 解析するワーカ数の設定
      numOfWorkers: navigator.hardwareConcurrency || 4,
      // バーコードの種類を設定: ISBNは"ean_reader"
      decoder: { readers: ["ean_reader"] }
    };
    // 初期化の開始。合わせて、初期化後の処理を設定
    this.Quagga.init(config, this.onInitilize);
  }

  /**
   * Quaggaの初期化完了後の処理
   * errorがなければ、起動する
   */
  private onInitilize(error: any) {
    if (!!error) {
      // エラーがある場合は、キャンセルをEmitする
      console.error(`Error: ${error}`, error);
      this.onClickCancel();
      return;
    }

    // エラーがない場合は、読み取りを開始
    console.info("Initialization finished. Ready to start");
    this.Quagga.start();
  }

  /**
   * バーコード検出時の処理
   */
  private onDetected(success: any) {
    // ISBNは'success.codeResult.code'から取得
    const isbn = success.codeResult.code;
    // ISBNをEmitで返却する
    this.onSuccess(isbn);
  }

  // ****************************************************
  // * emit
  // ****************************************************
  @Emit("cancel")
  private onClickCancel() {}

  @Emit("success")
  private onSuccess(code: any) {
    return code;
  }
}
</script>
<style lang="scss">
.camera-area {
  overflow: hidden;
  height: 300px;
  width: 300px;

  /**
   * 指定したDIV配下にvideoとcanvasが追加される
   * 4:3になるため、margin-topで調整
   */
  video,
  canvas {
    margin-top: -50px;
    width: 300px;
    height: 400px;
  }
}
</style>