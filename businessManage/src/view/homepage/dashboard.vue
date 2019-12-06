<template>
  <div class="dashboard">
    dashboard
  </div>
</template>

<script>
    import { mapGetters } from "vuex";
    export default {
        name: "dashboard",
        methods:{

        },
        computed: {
            //使用mapGetters导入catchData
            ...mapGetters(["catchData"])
        },
        created() {
        }
    }
</script>

<style scoped>

</style>
