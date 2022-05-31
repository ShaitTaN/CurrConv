<template>
  <div class="curr-portfolio__currencies-item">
    <img :src="src" />
    <h2>{{ currName }}</h2>
    <div class="curr-portfolio__currencies-item__value" @click="changeMode" v-if="!isEditingMode">
      {{ currValue || 0 }} <img src="@/assets/edit.png" />
    </div>
    <input
      @keydown.enter="changeMode"
      @blur="changeMode"
      v-else
      type="text"
      v-model="currValue"
      @input="changeInput"
    />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      require,
    },
    currName: {
      type: String,
      require,
    },
    value: {
      type: Number,
    },
  },
  data() {
    return {
      currValue: this.value,
      isEditingMode: false,
    };
  },
  methods: {
    changeMode() {
      this.isEditingMode = !this.isEditingMode;
    },
    changeInput(e) {
      this.$emit("updateInput", +e.target.value, this.currName);
    },
  },
};
</script>

<style lang='scss' scoped>
.curr-portfolio {
  &__currencies {
    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 280px;
      height: 330px;
      padding: 10px 0;
      background: #2b076e;
      border-radius: 16px;
      img {
        width: 100px;
        height: 100px;
        margin-bottom: 20px;
      }
      h2 {
        font-weight: 700;
        font-size: 24px;
        margin-bottom: 20px;
        text-transform: uppercase;
      }
      &__value {
        font-size: 20px;
        cursor: pointer;
        display: flex;
        align-items: center;
				position: relative;
				img{
					height: 14px;
					width: 14px;
					position: absolute;
					right: -20px;
				}
      }
      input {
        color: black;
        outline: none;
      }
    }
  }
}

@media (max-width: 1024px) {
  .curr-portfolio {
    &__currencies {
			&-item{
				margin-bottom: 30px;
			}
    }
  }
}
</style>