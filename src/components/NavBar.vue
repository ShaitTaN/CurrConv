<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar__logo" @click="$router.push('/')">
        <img src="@/assets/Logo.png" alt="" />
        <p>CURRCONV</p>
      </div>
      <ul class="navbar__menu">
        <li class="navbar__menu-item"><router-link to="/">Главная</router-link></li>
        <li class="navbar__menu-item">
          <router-link to="/portfolio">Валютный портфель</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "nav-bar",
};
</script>

<style lang="scss" scoped>
.navbar {
  background: #0d0d2b;
  padding: 10px 0;
  .container {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  &__logo {
    display: flex;
    align-items: center;
    cursor: pointer;
    img {
      margin-right: 10px;
    }
  }
  &__menu {
    display: flex;
    align-items: center;
    &-item {
      a {
        transition: color 0.3s ease;
        cursor: pointer;
				&.active-link{
					color: #4444ac;
				}
        &:first-of-type {
          margin-right: 20px;
        }
        &:hover {
          color: #4444ac;
        }
      }
    }
  }
}

@media(max-width: 600px){
	.navbar {
  &__logo {
    p{
			display: none;
		}
  }
}
}
</style>