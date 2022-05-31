<template>
  <div class="currency-converter">
    <converter-item
      :title="titles[0]"
      :value="haveInput"
      :activeCurr="haveCurrency"
      @updateCurrency="changeHaveCurrency"
      @updateInput="changeHaveInput"
    />
    <div class="currency-converter-arrows">
      <img src="@/assets/arrows.png" />
    </div>
    <converter-item
      :title="titles[1]"
      :value="buyInput"
      :activeCurr="buyCurrency"
      @updateCurrency="changeBuyCurrency"
      @updateInput="changeBuyInput"
    />
  </div>
  <line-chart :chartData='chartData'/>
</template>

<script>
import ConverterItem from "@/components/ConverterItem.vue";
import axios from "axios";
import LineChart from "@/components/LineChart.vue";

export default {
  name: "curr-converter",
  components: {
    ConverterItem,
    LineChart,
  },
  data() {
    return {
      haveInput: 0,
      buyInput: 0,
      firstInputSelected: true,
      haveCurrency: "btc",
      buyCurrency: "usd",
      currencies: { btc: "bitcoin", eth: "ethereum", usd: "usd" },
      titles: ["У меня есть", "Хочу приобрести"],
      currencies_rates: {},
      http: "https://api.coingecko.com/api/v3/coins/",
      exchangeRate: [],
    };
  },
  methods: {
    changeHaveCurrency(curr) {
      this.haveCurrency = curr;
      this.calculate();
			this.getExchangeRate()
    },
    changeBuyCurrency(curr) {
      this.buyCurrency = curr;
			this.getExchangeRate()
      this.calculate();
    },
    changeHaveInput(value) {
      this.haveInput = value;
      this.firstInputSelected = true;
      this.calculate();
    },
    changeBuyInput(value) {
      this.buyInput = value;
      this.firstInputSelected = false;
      this.calculate();
    },
    calculate() {
      if (this.firstInputSelected) {
        if (this.haveCurrency == this.buyCurrency) {
          this.buyInput = this.haveInput;
          return;
        }
        const rate =
          this.currencies_rates[this.haveCurrency].current_price[
            this.buyCurrency
          ];
        this.buyInput = this.haveInput * rate;
      } else {
        if (this.haveCurrency == this.buyCurrency) {
          this.haveInput = this.buyInput;
          return;
        }
        const rate =
          this.currencies_rates[this.buyCurrency].current_price[
            this.haveCurrency
          ];
        this.haveInput = this.buyInput * rate;
      }
    },
    async getCurrencyRates() {
      try {
        const btc = await axios.get(this.http + "bitcoin");
        const eth = await axios.get(this.http + "ethereum");
        const usd = await axios.get(this.http + "usd");

        this.currencies_rates = {
          btc: btc.data.market_data,
          eth: eth.data.market_data,
          usd: usd.data.market_data,
        };
      } catch (error) {
        alert(error);
      }
    },
    async getExchangeRate() {
      try {
        const response = await axios.get(
          `${this.http}/${
            this.currencies[this.haveCurrency]
          }/market_chart?vs_currency=${this.buyCurrency}&days=13&interval=daily`
        );
        const prices = response.data.prices;
        this.exchangeRate = prices.map((price) => +price[1].toFixed(2));
      } catch (e) {
        alert(e);
      }
    },
  },
  computed: {
    chartData() {
      return {
        labels: [13,12,11,10,9,8,7,6,5,4,3,2,1,0].map(item => {
					if(item == 0){
						return 'сегодня'
					}
					return item + 'д. назад'
				}),
        datasets: [
          {
            label: "Изменения курса за 14 дней",
            backgroundColor: "#f87979",
            data: this.exchangeRate,
          },
        ],
      };
    },
  },
  mounted() {
    this.getCurrencyRates();
    this.getExchangeRate();
  },
};
</script>

<style lang='scss' scoped>
.currency-converter {
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 50px;
  &-arrows {
    width: 100px;
    height: 100px;
    img {
      transform: rotate(90deg);
      width: 100%;
      height: 100%;
    }
  }
}

@media(max-width: 1024px){
	.currency-converter {
	flex-direction: column;
  &-arrows {
		margin: 20px 0;
    width: 60px;
    height: 60px;
    img {
      transform: rotate(0deg);
    }
  }
}
}
</style>