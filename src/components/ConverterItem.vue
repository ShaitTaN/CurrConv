<template>
  <div class="converter">
    <h2>{{ title }}</h2>
    <div class="converter__currencies">
      <div
        @click="changeCurrency(currency)"
        v-for="currency in currencies"
        :key="currency"
        :class="{
          'converter__currencies-item': true,
          active: currency == currentCurr,
        }"
      >
        {{ currency }}
      </div>
    </div>
    <div class="converter__input">
      <input v-model.number="inputValue" @input="updateInput" type="number" />
    </div>
  </div>
</template>

<script>
export default {
  name: "converter-item",
  props: {
    title: {
      type: String,
      require,
    },
    activeCurr: {
      type: String,
      require,
    },
		value:{
			type: Number,
		}
  },
  data() {
    return {
      currencies: ["btc", "eth", "usd"],
      currentCurr: this.activeCurr,
      inputValue: this.value,
    };
  },
  methods: {
    changeCurrency(currency) {
      this.$emit("updateCurrency", currency);
      this.currentCurr = currency;
    },
    updateInput(e) {
      this.$emit("updateInput", +e.target.value);
    },
  },
	watch: {
		value(){
			this.inputValue = this.value
		}
	}
};
</script>

<style lang='scss' scoped>
.converter {
  max-width: 410px;
  width: 100%;
  h2 {
    font-size: 20px;
    margin-bottom: 5px;
  }
  &__currencies {
    display: flex;
    justify-content: space-around;
    border: 1px solid white;
    border-radius: 6px;
    &-item {
      text-transform: uppercase;
      padding: 10px 15px;
      font-weight: 700;
      font-size: 24px;
      flex-grow: 1;
      text-align: center;
      border-right: 1px solid white;
      cursor: pointer;
      &:hover {
        color: #4444ac;
      }
      &:last-of-type {
        border: none;
      }
      &.active {
        color: #4444ac;
      }
    }
  }
  &__input {
    margin-top: 15px;
    input {
      width: 100%;
      height: 50px;
      outline: none;
      color: black;
      font-size: 24px;
      font-weight: 700;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type="number"] {
      -moz-appearance: textfield;
    }
  }
}
</style>