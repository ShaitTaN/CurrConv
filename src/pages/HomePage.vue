<template>
	<div class="home">
		<div class="container">
			<curr-converter></curr-converter>
			<line-chart/>
		</div>
	</div>
</template>

<script>
import CurrConverter from '@/components/CurrConverter.vue'
export default {
	components: {
		CurrConverter, 
	}
}
</script>

<style lang='scss' scoped>

</style>