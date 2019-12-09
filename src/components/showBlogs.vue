<template>
  <div v-theme:column="theme" id="showBlogs" class="main-container--show">
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
    <div class="lds-ring" v-if="loading">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
      <ul class="blog__list">
          <li v-theme="theme" v-for="blog in filteredBlogs" :key="blog.id" class="blog__item">
                <article class="blog__wrapper">
                    <h2 class="blog__single-title">{{blog.title | to-uppercase}}</h2>
                    <p class="blog__paragraph">{{blog.content | snippet}}</p>
                </article>
                <div class="blog__more-wrapper">
                    <router-link class="blog__single-link" :to="`/blog/${blog.id}`">Read more</router-link>
                    <span class="blog__created-date">{{blog.createdDate}}</span>
                </div>
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

        timer: '',
        loading: false,
    }
  },

  methods: {

      getBlogs() {
          this.loading = true;
           this.$http.get(`${APIUrl}`)
             .then(resp => resp.json())
             .then(data => {
                this.loading = false;
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
            }
  },

  created() {
      this.getBlogs();
      this.timer = setInterval(() =>
        {
           this.getBlogs()
        },300000);
  },

  beforeDestroy() {
      clearInterval(this.timer);
  },

 computed: {

    filteredBlogs() {
      return this.blogs.filter((blog) => {
        const currentBlogTitle = blog.title.toLowerCase();
        const inputSearchValue = this.search.toLowerCase();
        return currentBlogTitle.match(inputSearchValue);
      });
    }
  },
};
</script>

<style lang="scss">

@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

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

.blog__wrapper {
    padding-bottom: 1rem;
}

.blog__more-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

.blog__created-date {
    opacity: 0.5;
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

.wrapper {
    width: 100%;
    position: relative;

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
        right: 80px;

    }
}


.search-input {
    width: 100%;
    max-width: 200px;
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

.lds-ring {
  display: inline-block;
  position: relative;
  margin-top: 5rem;
  width: 80px;
  height: 80px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #000;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #000 transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}


</style>
