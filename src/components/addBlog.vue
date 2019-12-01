<template>
  <div id="addBlog" class="main-container--add">
     <h1 class="main-container--add__title">Add a New Blog Post</h1>

    <form v-if="!submitted" class="form">
      <p class="form__wrapper">
        <label class="form__label" for="cratedDate">Created date:</label>
        <input class="form__input date-input" disabled type="date" name="createdDate" id="createdDate" required v-model.lazy="blog.createdDate" />
      </p>
      <p class="form__wrapper">
        <label class="form__label" for="title">Blog title:</label>
        <input class="form__input" type="text" name="title" id="title" required v-model.lazy="blog.title" />
      </p>
      <p>
        <label class="form__label" for="content">Blog content:</label>
        <textarea class="form__input form__input--text-area" name="content" id="content" required v-model.lazy="blog.content"></textarea>
      </p>
      <div class="form__checkbox-wrapper">
        <p class="form__wrapper form__wrapper--checkbox">
          <label for="ninja">Ninja</label>
          <input type="checkbox" name="ninja" id="ninja" value="ninja" v-model="blog.categories">
        </p>
        <p class="form__wrapper form__wrapper--checkbox">
          <label for="wizards">Wizards</label>
          <input type="checkbox" name="wizards" id="wizards" value="wizards" v-model="blog.categories">
        </p>
        <p class="form__wrapper form__wrapper--checkbox">
          <label for="mario">Mario</label>
         <input type="checkbox" name="mario" id="mario" value="mario" v-model="blog.categories">
        </p>
        <p class="form__wrapper form__wrapper--checkbox">
          <label for="cheese">Cheese</label>
          <input type="checkbox" name="cheese" id="cheese" value="cheese" v-model="blog.categories">
        </p>
      </div>
      <p class="form__wrapper">
        <label class="form__label" for="author">Author:</label>
        <select name="author" id="author" v-model="blog.author">
          <option v-for="author in authors" :key="author">{{author}}</option>
        </select>
      </p>
      <p class="form__errors" v-if="errors.length && hideErrors">
        <span>Please correct the following errors:</span>
        <ul>
          <li v-for="error in errors" :key="error">
            {{error}}
          </li>
        </ul>
      </p>
      <button class="form__send-button" @click.prevent="post"><font-awesome-icon class="plus-icon icon" icon="plus" />Add Blog</button>
    </form>

    <div class="after-post" v-if="submitted">
      <h2 class="after-post__title">Thanks for adding your post!</h2>
    </div>

    <div class="preview">
      <h3 class="preview__header">Preview Blog</h3>
      <p class="preview__date">
        Created date:
        <span class="preview__value">{{blog.createdDate}}</span>
      </p>
      <p class="preview__title">
        Blog title:
        <span class="preview__value">{{blog.title}}</span>
      </p>
      <p class="preview__content">Blog content:</p>
      <p class="preview__content--value">
        <span class="preview__value">{{blog.content}}</span>
      </p>
      <p class="preview__categories">
        Blog categories:
        <ul class="preview__categories--list">
          <li class="preview__categories--item" v-for="category in blog.categories" :key="category">
            <span class="preview__value">{{category}}</span>
          </li>
        </ul>
      </p>
      <p class="preview__author">
        Author:
        <span class="preview__value">{{blog.author}}</span>
      </p>
    </div>
    <transition name="fade">
      <app-modal :show="visible" @close="showErrors" :content="bodyHere"></app-modal>
    </transition>
  </div>
</template>

<script>
import { APIUrl } from '../variables/variables';
import modal from '../components/modal.vue';

const today = new Date().toISOString().slice(0,10);

export default {
  name: "addBlog",
  components: {
    'app-modal': modal,
  },
  data() {
    return {
      blog: {
        title: "",
        content: "",
        createdDate: today,
        categories: [],
        author: "",
      },
      authors: ['The Net Master','The Angular Avenger','The Vue Vindicator'],
      submitted: false,
      errors: [],
      visible: false,
      hideErrors: false,
      bodyHere: "Errors have occurred while filling in the form!"
    };
  },
  methods: {
    show() {
      this.visible = true;
    },

    showErrors() {
      this.visible = false;
      this.hideErrors = true;
    },

    checkForm() {
      this.errors = [];

      if(this.blog.title && this.blog.content && this.blog.createdDate && this.blog.categories.length > 0 && this.blog.author) {
        return true;
      }

      if(!this.blog.createdDate) {
        this.errors.push('Created date required');
      }

      if(!this.blog.title) {
        this.errors.push('Title required');
      }

      if(!this.blog.content) {
        this.errors.push('Content required');
      }

      if(this.blog.categories.length === 0) {
        this.errors.push('Categories required');
      }

      if(!this.blog.author) {
        this.errors.push('Author required');
      }
    },

    post() {
      const isValid = this.checkForm();

      if(isValid) {
        this.$http.post(`${APIUrl}`, this.blog)
        .then(data => {
          console.log(data);
          this.submitted = true;
          setTimeout(() => {
            this.$router.push('/');
          }, 1500);
        })
        .catch(err => {
          console.log(err)
          })

      } else {
        //alert('Try again!');
        this.show();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes rotateYe {

    0% {
        transform: rotate(0);
    }

    100% {
        transform: rotate(180deg);
    }

    // 100% {
    //     transform: rotate(0deg);
    // }
    
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-10px);
}

.main-container--add {
  width: 100%;
  max-width: 950px;
  padding: 1rem;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: flex-start;

  &__title {
    margin: 3rem 0 4rem 0;
    flex-basis: 100%;
    text-align: center;
  }
}

.form {
  width: 100%;
  max-width: 400px;

  &__wrapper {
    margin: 1rem 0;

    &--checkbox {
      display: inline-block;
    }

    &--checkbox + &--checkbox {
      margin-left: 1rem;
    }
  }

  &__label {
    display: block;
    margin-bottom: 0.4rem;
  }

  &__input {
    display: block;
    width: 100%;
    padding: 0.4rem;
    &--text-area {
      min-height: 80px;
    }
  }

  &__send-button {
    margin: 1rem 0;
    background: #2c3e50;
    border: 1px solid #2c3e50;
    cursor: pointer;
    color: #ffffff;
    font-weight: bold;
    padding: 0.7rem 1.5rem;
    transition: background .4s ease-in-out, color .4s ease-in-out;

    &:hover {
      background: #ffffff;
      color: #2c3e50;
    }

    &:hover > svg {
      animation: rotateYe 1s infinite;
    }
  }

  &__errors {
    margin-top: 2rem;
    color: #dc6868;
  }
}

svg {
    margin-right: 0.5rem;
    animation: rotateYe 1s;
}

.preview {
  width: 100%;
  max-width: 400px;
  margin-top: 2.5rem;
  padding: 0.4rem 1rem;
  box-shadow: 0px 6px 16px rgba(24, 41, 67, 0.2);
  overflow-wrap: break-word;

  &__content {
    display: block;
  }

  &__value {
    color: #2c3e508e;
  }
}
</style>
