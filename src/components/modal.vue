<template>
  <div v-if="show" class="modal">
    <div class="modal__box">
      <h1>{{ content }}</h1>
      <button @click="closeModal">Show errors</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "modal",
  props: {
    content: {
      type: String,
      required: true
    },
    show: {
      type: Boolean
    }
  },
  data() {
    return {};
  },
  methods: {
    closeModal() {
      this.$emit("close");
    }
  }
};
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);

  &__box {
    width: 100%;
    max-width: 500px;
    padding: 3rem 1.5rem;
    background: #fff;
    color: #000;
    box-shadow: 0px 6px 16px rgba(24, 41, 67, 0.5);
  }
}

h1 {
    margin: 0 0 2.5rem 0;
}

button {
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
  }
</style>
