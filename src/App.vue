<template>
  <div id="app">
    <h1>TodoList</h1>
    <div class="categories">
      <Category v-for="(category, index) in categories()" :items="itemsInCategory(category)" v-bind:key="index" :title="category" :deleteCategory="openDeleteCategory.bind(null, category)"/>
      <Category :items="itemsWithoutCategory()" title="Uncategorised" :deleteCategory="deleteCategory.bind(null)"/>
    </div>
    <input type="text" v-on:keyup.enter="newItem" placeholder="New Todo Item" class="square-input" v-model="newItemText"/> 
    <small>Use #categoryname to put your items into categories</small>
    <button class="button" @click="openModal">Clear</button>
 <Modal v-bind:visible="clearModal" @close="closeModal">
    <template slot="header">
      <div class="headers">
        <h3 style="float: left;">Are you sure?</h3>
      </div>
    </template>
    <template slot="body">
      Are you sure you want to clear your todo list?
      <br/>
    <button class="button" @click="clear">Yes!</button>
    <button class="button" @click="closeModal">No!</button>
    </template>
    <template slot="footer">
      <div></div>
    </template>
  </Modal>
  <Modal v-bind:visible="deleteModal" @close="closeDeleteCategory">
    <template slot="header">
      <div class="headers">
        <h3 style="float: left;">Are you sure?</h3>
      </div>
    </template>
    <template slot="body">
      Are you sure you want to delete that category?
      <br/>
    <button class="button" @click="deleteCategory">Yes!</button>
    <button class="button" @click="closeDeleteCategory">No!</button>
    </template>
    <template slot="footer">
      <div></div>
    </template>
  </Modal>
  </div>
</template>

<script>
import Category from './components/Category.vue'
import Modal from './components/Modal.vue'
import { mapState } from 'vuex';

export default {
  name: 'app',
  data: function(){
    return {
      newItemText: "",
      clearModal: false,
      deleteModal: false,
      selectedCategory: ""
    }
  },
  components: {
    Category,
    Modal
  },
  watch: {
    items: function(val){
      this.$forceUpdate();
    }
  },
  computed: {...mapState(['items'])},
  methods: {
    categories: function(){
      return this.items.filter((item) => item.category !== undefined).map((item) => item.category.toLowerCase()).filter((category, index, self) => self.indexOf(category.toLowerCase())== index)
    },
    guid: function () {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },
    newItem: function(){
      if(this.newItemText.trim() === ""){
        return;
      }
      let item = {title: this.newItemText.trim(), done: false, id: this.guid()};
      if(this.newItemText.indexOf("#") !== -1){
        if(this.newItemText.substring(0, this.newItemText.indexOf("#")).trim() === ""){
          item['isBlank'] = true;
        }
        item['category'] = this.newItemText.substring(this.newItemText.indexOf("#") + 1, this.newItemText.length).trim().toLowerCase();
        item['title'] = this.newItemText.substring(0, this.newItemText.indexOf("#")).trim();
      }
      this.$store.commit('addItem', item);
      this.newItemText = "";
    },
    clear: function(){
      this.$store.commit('clear');
      this.clearModal = false;
    },
    itemsInCategory: function(title){
      return this.items.filter((item) => item.category !== undefined && item.category.toLowerCase() === title.toLowerCase());
    },
    itemsWithoutCategory: function(){
      return this.items.filter((item) => item.category === undefined)
    },
    closeModal: function(){
      this.clearModal = false;
    },
    openModal: function(){
      this.clearModal = true;
    },
    deleteCategory: function(){
      let category = this.selectedCategory;
      this.itemsInCategory(category).forEach((item) => {
        delete item['category'];
        this.$store.commit('updateItem', item)
      });
      this.selectedCategory = "";
      this.$forceUpdate();
      this.closeDeleteCategory();
    },
    openDeleteCategory: function(category){
      this.selectedCategory = category;
      this.deleteModal = true;
    },
    closeDeleteCategory: function(){
      this.selectedCategory = "";
      this.deleteModal = false;
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
  margin-right: 10px;
}
.categories {
  display: flex;
  align-items: start;
  flex-direction: column;
}
</style>
