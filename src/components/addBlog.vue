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

export default {
  name: "addBlog",
};
</script>

<style lang="scss" scoped>
</style>
