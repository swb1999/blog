<template>
    <div class="block">
       <full-calendar :events="fcEvents" locale="en"></full-calendar>
  </div>
</template>
<script>
    import fullCalendar from 'vue-fullcalendar'
    export default {
        data(){
           return {
               fcEvents:[
                    
                ]
           }
        },
        components:{
            fullCalendar
        }
    }
</script>
<style lang="scss" scoped>
   .full-calendar-header .header-center .title{
        width: 120px;
    }
</style>
