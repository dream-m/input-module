<template>
   <div class="calendar">
        <!-- 年月 -->
        <div class="title">
            <div class="arrow" @click="preMonth()" > ❮ </div>
                <div class="year-month">
                    <span>{{currentYear}}年{{currentMonth}}月</span>
                </div>
            <div class="arrow" @click="nextMonth()" > ❯ </div>
        </div>
        <!-- 星期 -->
        <ul class="weekdays">
            <li v-for='(val,index) in weeks' :key="index">
                <span>{{val}} </span>
            </li>
        </ul>
        <!-- 日期 -->
        <ul class="days">
            <li v-for='(day,index) in days' :key="index">
                <span @click="getDate(day.day)">{{day.day.getDate()}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
        currentDay: 1,
        currentMonth: 1,
        currentYear: 1970,
        currentWeek: 1,
        weeks: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
        days: []
        };
  },
  props: {
    value: [Date, String, Number],
  },
  mounted() {
    this.init(this.value);
  },
  methods: {
    init(value) {
      let day;
      if (value) {
        day = new Date(value);
      } else {
        let now = new Date();
        day = new Date(this.formDate(now.getFullYear(), now.getMonth() + 1, 1));
      }
      this.currentDay = day.getDate(); 
      this.currentYear = day.getFullYear();  
      this.currentMonth = day.getMonth() + 1;
      this.currentWeek = day.getDay();
      if (!this.currentWeek) {
        this.currentWeek = 7;
      }
      this.days.length = 0;
      let str = this.formDate(
        this.currentYear,
        this.currentMonth,
        this.currentDay
      );
      for (let i = 2 - this.currentWeek ; i < 37 - this.currentWeek; i++) {
        let day = new Date(str);
        day.setDate(i);
        this.days.push({
          day: day
        });
      }   
    },
    getDate(date){
      this.dateItem = new Date(+new Date(date) + 8 * 3600 * 1000).toISOString().slice(0, 10)
      this.$emit("click", this.dateItem);
    },
    preMonth(){
        this.currentMonth --
        if(this.currentMonth === 0){
            this.currentMonth = 12
            this.currentYear--
        }
        let day = new Date(this.formDate(this.currentYear, this.currentMonth, 1)); 
        this.init(this.formDate(day.getFullYear(), day.getMonth() + 1, 1));
    },
    nextMonth(){
        this.currentMonth ++ 
        if(this.currentMonth > 12){
            this.currentMonth = 1
            this.currentYear ++
        }
        let day = new Date(this.formDate(this.currentYear, this.currentMonth, 1));
        this.init(this.formDate(day.getFullYear(), day.getMonth() + 1, 1));
    },
    formDate(year, month, day) {
      return year + "-" + month + "-" + day;
    }
  }
};
</script>

<style>
ul {
  list-style-type: none;
}
.calendar {
  width:600px;
  height: 300px;
  margin: 0 auto;
}
.title {
  font-size: 20px;
  display: flex;
  justify-content: space-between;
  background-color: #1989fa;
  color: #ffffff;
}
.title .arrow {
  padding: 20px;
  cursor: pointer;
}
.year-month {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.weekdays {
  margin: 0;
  padding: 10px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.weekdays li {
  display: inline-block;
  width: 13.6%;
  text-align: center;
}
.days {
  padding: 0;
  background: #ffffff;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.days li {
  display: inline-block;
  width: 14.2%;
  text-align: center;
  padding-bottom: 8px;
  padding-top: 8px;
  cursor: pointer;
}

.days li span {
  padding:0 10px;
}
</style>