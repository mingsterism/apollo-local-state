<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">

    <h1>
      TODO ITEMS:
      {{todoItems}}
    </h1>
    <label>
      <input type="text" v-model="inputText">
      {{inputText}}
    </label>
    <button @click="addItem">ADD ITEM</button>
  </div>
</template>

<script>

    import {
        todoItemsQuery,
        checkItemMutation,
        addItemMutation
    } from './mutationQueries'


    export default {
        name: 'App',
        data() {
            return {
                message: "Test",
                inputText: ""
            }
        },
        components: {},
        apollo: {
            todoItems: {
                query: todoItemsQuery
            },
        },
        methods: {
            checkItem(id) {
                this.$apollo.mutate({
                    mutation: checkItemMutation,
                    variables: { id }
                });
            },
            addItem() {
                this.$apollo.mutate({
                    mutation: addItemMutation,
                    variables: { todo: this.inputText }
                });
                this.inputText = ""
            },
        }
    }
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
