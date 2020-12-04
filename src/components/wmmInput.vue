<template>
  <div>
    <button class="buttonStyle" @click="reduce">-</button>
    <input class="inputStyle" type="text" :disabled="inputNumberDisabled" v-model="currentValue" @click="handleChange()"/>
    <button class="buttonStyle" @click="add">+</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentValue: 0
    };
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    inputNumberDisabled() {
      return this.disabled;
    }
  },
  mounted() {
    // 更新当前值
    this.updateValue(this.value);
  },
  methods: {
    reduce() {
      this.currentValue -= this.step;
      this.$emit("change", this.currentValue);
    },
    add() {
      this.currentValue += this.step;
      this.$emit("change", this.currentValue);
    },
    handleChange(val) {
      this.$emit("change", this.currentValue);
    },
    updateValue(val) {
      this.currentValue = val;
    }
  }
};
</script>

<style scoped>
.inputStyle {
  width: 60px;
  text-align: center;
  height: 35px;
  line-height: 35px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  cursor: pointer;
}
.buttonStyle {
  width: 30px;
  height: 35px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  color: #606266;
  background: #f5f7fa;
  cursor: pointer;
}
</style>
