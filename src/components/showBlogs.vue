<template>
  <div id="showBlogs" class="main-container--show">
    <div class="theme-switch">
          <p class="wrapper">
              <input 
                type="radio"
                id="white"
                name="theme"
                @change="theme = 'white'"
                checked
                >
              <label class="sun-label" for="white"><font-awesome-icon class="sun-icon icon" icon="sun" /></label>
          </p>
          <p class="wrapper">
              <input 
                type="radio"
                id="dark"
                name="theme"
                @change="theme = 'dark'"
              >
              <label class="moon-label" for="dark"><font-awesome-icon class="moon-icon icon" icon="moon" /></label>
          </p>
      </div>
      <h1 class="blog__title">All Blog Articles</h1>
      <p class="wrapper wrapper-search--blogs">
          <input class="search-input" type="text" id="search" name="search" v-model="search" placeholder="search blogs">
          <label for="search"><font-awesome-icon class="search-icon icon" icon="search" /></label>
      </p>
      <ul class="blog__list">
          <li v-theme="theme" v-for="blog in filteredBlogs" :key="blog.id" class="blog__item">
                <article class="blog__wrapper">
                    <h2 class="blog__single-title">{{blog.title}}</h2>
                    <p class="blog__paragraph">{{blog.content}}</p>
                </article>
              <router-link class="blog__single-link" :to="`/blog/${blog.id}`">Read more</router-link>
          </li>
      </ul>
  </div>
</template>

<script>
import { APIUrl } from '../variables/variables';

export default {
  name: "showBlogs",
  data() {
    return {
        blogs: [],
        search: '',
        wide: '',
        theme: 'white',
    }
  },
  
  created() {
      this.$http.get(`${APIUrl}`)
      .then(resp => resp.json())
      .then(data => {
         const blogsArray = [];
         for (let key in data) {
             data[key].id = key;
             blogsArray.push(data[key]);
         }
         this.blogs = blogsArray;
      })
      .catch(err => {
          console.log(err)
          })
  },
};
</script>

<style lang="scss" scoped>
</style>
