<template>
  <div class="curr-portfolio">
    <div class="container">
      <div class="curr-portfolio__currencies">
        <portfolio-currency-item
          v-for="(item, i) in currencies"
          :key="item"
          :src="images[i]"
          :currName="item"
          @updateInput="updateCurrency"
          :value="currency_count[item]"
        />
      </div>
      <div class="curr-portfolio__price">
        Оценка портфеля: {{ totalPrice }}$
      </div>
      <div class="curr-portfolio__pie">
        <h2>Распределение криптовалют в долларах</h2>
        <pie-chart :chartData="chartData" />
      </div>
    </div>
  </div>
</template>

<script>
import btc from "@/assets/btc.svg";
import eth from "@/assets/eth.svg";
import usd from "@/assets/usd.png";
import PortfolioCurrencyItem from "@/components/PortfolioCurrencyItem.vue";
import axios from "axios";
import PieChart from "@/components/PieChart.vue";

export default {
  components: {
    PortfolioCurrencyItem,
    PieChart,
  },
  data() {
    return {
      images: [btc, eth, usd],
      currencies: ["btc", "eth", "usd"],
      currencies_rates: {},
      currency_count: {
        btc: 1,
        eth: 1,
        usd: 3000,
      },
			data: []
    };
  },
  methods: {
    updateCurrency(value, name) {
      this.currency_count[name] = value;
			this.allToUsd()
    },
    toUsd(currency) {
      return (
        this.currencies_rates[currency]?.current_price.usd *
        this.currency_count[currency]
      );
    },
    async getCurrRates() {
      try {
        const btc = await axios.get(
          "https://api.coingecko.com/api/v3/coins/bitcoin"
        );
        const eth = await axios.get(
          "https://api.coingecko.com/api/v3/coins/ethereum"
        );
        const usd = await axios.get(
          "https://api.coingecko.com/api/v3/coins/usd"
        );

        this.currencies_rates = {
          btc: btc.data.market_data,
          eth: eth.data.market_data,
          usd: usd.data.market_data,
        };

				this.allToUsd()
      } catch (error) {
        alert(error);
      }
    },
		allToUsd(){
			const btc = this.toUsd('btc');
      const eth = this.toUsd('eth');
      const usd = this.currency_count.usd;
			this.data = [btc, eth, usd]
		}
  },
  mounted() {
    this.getCurrRates();
  },
  computed: {
    totalPrice() {
      if (Object.keys(this.currencies_rates).length === 0) return 0;
      const btc = this.toUsd('btc');
      const eth = this.toUsd('eth');
      const usd = this.currency_count.usd;
      return Math.ceil(btc + eth + usd);
    },
    chartData() {
      return {
        labels: ["BTC", "ETH", "USD"],
        datasets: [
          {
            backgroundColor: ["#f8a037", "#00D8FF", "#72bd39"],
						data: this.data
          },
        ],
      };
    },
  },
};
</script>

<style lang='scss' scoped>
.curr-portfolio {
  margin-top: 50px;
  .container {
    padding: 0 50px;
  }
  &__currencies {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__price {
    margin-top: 20px;
    background: #2b076e;
    width: 300px;
    height: 50px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    margin-bottom: 50px;
  }
  &__pie {
    h2 {
      font-size: 20px;
      text-align: center;
      margin-bottom: 10px;
    }
  }
}

@media (max-width: 1024px) {
  .curr-portfolio {
    &__currencies {
      flex-direction: column;
    }
    &__price {
      margin: 0 auto 30px;
    }
  }
}
</style>