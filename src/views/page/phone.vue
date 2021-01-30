<template>
  <div class="phone">
    phone
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'phone',
  data () {
    return {}
  },
  computed:{
    ...mapState(['yuan']),
    ...mapState({
      gui(state){
        // console.log(state)
        return state
      }
    }),
  },
  methods:{
    ...mapMutations('approve2', ['yuanMutations'])
  },
  mounted(){
    this.$store.commit('approve1/yuanMutations','yuan789123')
    // this.yuanMutations('yuan789123')
  }
}
</script>

<style scoped lang="less">
</style>
