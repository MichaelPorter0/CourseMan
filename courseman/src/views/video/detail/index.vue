
<template>
  <el-container>
    <el-header>
      <el-row type="flex" justify="center">
        <el-col :span="4" >
          <p class="title">天圆地方</p>
        </el-col>
    </el-row></el-header>
    <el-main>
      <el-row type="flex" justify="center">
        <el-col :span="12">
          <!-- <md-card>
            <md-card-media> -->
          <div class="item">
            <div class="player">
              <video-player
                ref="videoPlayer"
                :options="playerOptions"
                :playsinline="true"
                class="vjs-custom-skin"
                @play="onPlayerPlay($event)"
                @pause="onPlayerPause($event)"
                @ended="onPlayerEnded($event)"
                @loadeddata="onPlayerLoadeddata($event)"
                @waiting="onPlayerWaiting($event)"
                @playing="onPlayerPlaying($event)"
                @timeupdate="onPlayerTimeupdate($event)"
                @canplay="onPlayerCanplay($event)"
                @canplaythrough="onPlayerCanplaythrough($event)"
                @ready="playerReadied"
                @statechanged="playerStateChanged($event)" />
            </div>
          </div>
          <!-- </md-card-media>
          </md-card> -->
        </el-col>

    </el-row></el-main>
  </el-container>

</template>

<script>
import './custom-theme.css'
export default {
  data() {
    return {
    // videojs options
      playerOptions: {
        height: '360',
        autoplay: true,
        muted: true,
        language: 'en',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: 'video/mp4',
          src: 'http://dxytest.oss-cn-beijing.aliyuncs.com/%E8%A7%86%E9%A2%9113%E5%88%86%E9%92%9F.mp4?Expires=1557674831&OSSAccessKeyId=TMP.AgGuW4Iak2RCAAcPTyiAVpa1ezlvKJAlr_allJZnKVSYWDrQ2q33SC0yihlCADAtAhR93ncTj9PG1rBksQLEe-FFyHOciQIVANzAWbsXCxb4EACJRCCJkeXkBuy4&Signature=DjLSP4%2F46YcB4Xfq2d%2BxstalAWY%3D'
          // src: 'http://dxytest.oss-cn-beijing.aliyuncs.com/%E8%A7%86%E9%A2%912%E5%88%86%E9%92%9F.mp4?Expires=1557674806&OSSAccessKeyId=TMP.AgGuW4Iak2RCAAcPTyiAVpa1ezlvKJAlr_allJZnKVSYWDrQ2q33SC0yihlCADAtAhR93ncTj9PG1rBksQLEe-FFyHOciQIVANzAWbsXCxb4EACJRCCJkeXkBuy4&Signature=m%2BPgLs3cmsUlh3jez1nOSd%2BRxN0%3D'
        }],
        poster: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-1.jpg'
      }
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    }
  },
  mounted() {
    // console.log('this is current player instance object', this.player)
    setTimeout(() => {
      console.log('dynamic change options', this.player)
      // change src
      // this.playerOptions.sources[0].src = 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm';
      // change item
      // this.$set(this.playerOptions.sources, 0, {
      //   type: "video/mp4",
      //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
      // })
      // change array
      // this.playerOptions.sources = [{
      //   type: "video/mp4",
      //   src: 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm',
      // }]
      this.player.muted(false)
    }, 5000)
  },
  methods: {
    // listen event
    onPlayerPlay(player) {
    // console.log('player play!', player)
    },
    onPlayerPause(player) {
    // console.log('player pause!', player)
    },
    onPlayerEnded(player) {
    // console.log('player ended!', player)
    },
    onPlayerLoadeddata(player) {
    // console.log('player Loadeddata!', player)
    },
    onPlayerWaiting(player) {
    // console.log('player Waiting!', player)
    },
    onPlayerPlaying(player) {
    // console.log('player Playing!', player)
    },
    onPlayerTimeupdate(player) {
    // console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay(player) {
    // console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough(player) {
    // console.log('player Canplaythrough!', player)
    },
    // or listen state event
    playerStateChanged(playerCurrentState) {
    // console.log('player current update state', playerCurrentState)
    },
    // player is ready
    playerReadied(player) {
    // seek to 10s
      console.log('example player 1 readied', player)
      player.currentTime(10)
    // console.log('example 01: the player is readied', player)
    }
  }
}
</script>
<style>
.player{
  widows: 50px;
}
.title{
  font-size: 30px;
}
</style>
