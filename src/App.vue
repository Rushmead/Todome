<template>
  <div id="app">
    <h1>TodoList</h1>
    <div class="categories">
      <Category v-for="(category, index) in categories" :items="itemsInCategory(category)" v-bind:key="index" :title="category"/>
      <Category :items="itemsWithoutCategory()" title="Uncategorised"/>
    </div>
    <input type="text" v-on:keyup.enter="newItem" placeholder="New Todo Item" class="square-input" v-model="newItemText"/> 
    <small>Use #categoryname to put your items into categories</small>
    <button class="button" @click="clear">Clear</button>
  </div>
</template>

<script>
import Category from './components/Category.vue'
import { mapState } from 'vuex';

export default {
  name: 'app',
  data: function(){
    return {
      newItemText: "",
    }
  },
  components: {
    Category
  },
  watch: {
    items: function(val){
      this.$forceUpdate();
      this.categories = val.filter((item) => item.category !== undefined).map((item) => item.category).filter((category, index, self) => self.indexOf(category)== index)
    }
  },
  computed: {...mapState(['items']),
    categories: {
      get: function(){
        return this.items.filter((item) => item.category !== undefined).map((item) => item.category).filter((category, index, self) => self.indexOf(category)== index)
      },
      set: function(newVal){
        
      }
    }
  },
  methods: {
    newItem: function(){
      if(this.newItemText.trim() === ""){
        return;
      }
      let item = {title: this.newItemText, done: false, id: this.items.length + 1};
      if(this.newItemText.indexOf("#") !== -1){
        if(this.newItemText.substring(0, this.newItemText.indexOf("#")).trim() === ""){
          item['isBlank'] = true;
        }
        item['category'] = this.newItemText.substring(this.newItemText.indexOf("#") + 1, this.newItemText.length).trim();
        item['title'] = this.newItemText.substring(0, this.newItemText.indexOf("#"));
      }
      this.$store.commit('addItem', item);
      this.newItemText = "";
    },
    clear: function(){
      this.$store.commit('clear');
    },
    itemsInCategory: function(title){
      return this.items.filter((item) => item.category !== undefined && item.category === title);
    },
    itemsWithoutCategory: function(){
      return this.items.filter((item) => item.category === undefined)
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato');
#app {
  font-family: 'Lato';
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.square-input {
  padding: 10px 10px;
  margin-bottom: 20px;
  margin-top: 10px;
}
.button {
  border: none;
  padding: 20px 20px;
  background-color: #e67e22;
  color: white;
  cursor: pointer;
  margin-top: 10px;
}
.categories {
  display: flex;
  align-items: start;
  flex-direction: column;
}
</style>
