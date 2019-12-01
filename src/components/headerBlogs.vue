<template>
  <nav id="headerBlogs" class="main-container--header navigation">
      <ul class="navigation__list">
          <li class="navigation__item"><router-link class="navigation__link" to="/">Blog list</router-link></li>
          <li class="navigation__item"><router-link class="navigation__link" to="/add-blog">Add a New Blog</router-link></li>
      </ul>
  </nav>
</template>

<script>

export default {
  name: "headerBlogs",
};
</script>

<style lang="scss" scoped>
.navigation {
    box-shadow: 0px 6px 16px rgba(24, 41, 67, 0.2);
    background: #2c3e50;
    padding: 1rem 0;

    &__list {
        list-style-type: none;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    &__item {
        padding: 0.5rem 0;
    }

    &__item + &__item{
        margin-left: 2rem;
    }

    &__link {
        text-decoration: none;
        color: #fff;
        font-weight: bold;
        position: relative;
        
        &::after {
            position: absolute;
            content: "";
            width: 0%;
            height: 0.1rem;
            background: #fff;
            bottom: -10px;
            left: 0;
            transition: width .4s ease-in-out;
        }
    }
}

.router-link-exact-active::after {
    width: 100%;
}
</style>
