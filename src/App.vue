<template>
	<nav-bar></nav-bar>
	<router-view></router-view>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
components: {
	NavBar
},
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;700&display=swap');
*{
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	text-decoration: none;
	list-style: none;
	font-family: 'Rubik', sans-serif;
	font-size: 16px;
	color: white;
}
body{
	background: #101033;
}
.container{
	max-width: 1230px;
	width: 100%;
	margin: 0 auto;
}
</style>
