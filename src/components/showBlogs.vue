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
          <li v-for="blog in filteredBlogs" :key="blog.id" class="blog__item">
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

    computed: {
      filteredBlogs() {
           return this.blogs.filter((blog) => {
            return blog.title.match(this.search);
          });
      }
  },
};
</script>

<style lang="scss">
.main-container--show {
    position: relative;
    width: 100%;
    padding: 1rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: background .4s ease-in-out;
}

.blog__title {
    margin: 0;
    padding: 3rem 0 4rem 0;
}

.blog__single-link {
    padding: 0.5rem 0.8rem;
    background: #2c3e50;
    border: 1px solid #2c3e50;
    color: #fff;
    text-decoration: none;
    transition: background .4s ease-in-out, color .4s ease-in-out;

    &:hover {
      background: #ffffff;
      color: #2c3e50;
    }
}

.theme-switch {
    position: absolute;
    top: 25px;
    right: 35px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 100px;
    box-shadow: rgba(24, 41, 67, 0.2) 0px 6px 16px;
    padding: 0.1rem;

    @media only screen and (max-width: 640px) {
        top: 0;
        right: 0;
        max-width: 70px;
    }
}

.theme-switch .wrapper .icon{
    width: 20px;
    height: 20px;
    position: relative;
}

.wrapper {
    position: relative;
}

.sun-label::after {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    width: 0.1rem;
    height: 100%;
    background: #000;

    @media only screen and(max-width: 640px){
        width: 0.05rem;
    }
}

.theme-switch .wrapper {
    text-align: center;
}

.blog__wrapper {
    padding-bottom: 1rem;
}

.blog__list {
    list-style-type: none;
    padding: 0;
    width: 100%;
    max-width: 800px;
}

.blog__item {
    box-shadow: 0px 6px 16px rgba(24, 41, 67, 0.2);
    padding: 1rem 0.8rem;
    margin-bottom: 2rem;
    transition: transform .4s ease-in-out, background .4s ease-in-out, color .4s ease-in-out;
}

.blog__item:hover {
    transform: translateY(-3px);
}

.wrapper {
    width: 100%;

    &-search--blogs {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        max-width: 360px;
    }

    &-search--blogs .search-icon {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 30px;
        right: 70px;

    }
}


.search-input {
    background: none;
    border: none;
    border-bottom: 1px solid #000;
    color: #000;
    margin: 1.5rem 0 0.5rem 0;
    padding: 0.3rem 1.5rem 0.3rem 0;
    font-size: 1rem;
}

input[type="radio"] {
    display: none;
}

input[type="radio"]:checked + label {
    color: coral;
}

.icon {
    cursor: pointer;
}
</style>
