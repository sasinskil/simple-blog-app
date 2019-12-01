<template>
  <nav id="singleBlog" class="main-container--blog">
    <h1 v-rainbow>{{blog.title}}</h1>
      <p>{{blog.content}}</p>
      <p><strong>Categories: </strong>
        <ul>
            <li v-for="category in blog.categories" :key="category">
                {{category}}
            </li>
        </ul>
      </p>
      <p><strong>Author: </strong>{{blog.author}}</p>
      <button @click="backToList"><font-awesome-icon class="arrow-left-icon icon" icon="arrow-left" />Blog list</button>
  </nav>
</template>

<script>
import { APIUrl } from '../variables/variables';

export default {
   name: "singleBlog",
  data() {
    return {
        id: this.$route.params.id,
        blog: {}
      }
    },
    methods: {
        backToList() {
            this.$router.push( '/' );
        },
    },
    created() {
        const APIUrlNew = APIUrl.substring(0, APIUrl.length-5);
        this.$http.get(`${APIUrlNew}/${this.id}.json`)
        .then(response => response.json())
        .then(object => {
             this.blog = object;
        })
        .catch(err => {
          console.log(err)
          })
    }
};
</script>

<style lang="scss" scoped>
@keyframes moveYe {

    0% {
        transform: translateX(0px);
    }

    50% {
        transform: translateX(-3px);
    }

    100% {
        transform: translateX(0px);
    }
    
}


.main-container--blog {
    width: 100%;
    max-width: 900px;
    padding: 1rem;
    margin: 3rem auto;
    box-shadow: 0px 6px 16px rgba(24, 41, 67, 0.2);
}

svg {
    width: 15px;
    height: 15px;
    margin-right: 0.5rem;
    animation: moveYe .8s;
}

button {
    margin: 3rem 0 0;
    background: #2c3e50;
    border: 1px solid #2c3e50;
    cursor: pointer;
    color: #ffffff;
    font-weight: bold;
    padding: 0.7rem 1.3rem;
    transition: background .4s ease-in-out, color .4s ease-in-out;

    &:hover {
      background: #ffffff;
      color: #2c3e50;
    }

    &:hover > svg {
        animation: moveYe .8s infinite;
    }
}
</style>
