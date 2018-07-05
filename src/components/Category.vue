<template>
    <div class="category">
        <p @blur="saveTitle"><span :contenteditable="title !== 'Uncategorised'"> {{title}}</span> 
        <small v-if="title !== 'Uncategorised'" class="link" @click="deleteCategory">- Delete</small></p>
        <small v-if="filteredItems.length === 0">No Items</small>
        <TodoItem v-for="item in filteredItems" v-bind:key="item.id" :done="item.done" :removeItem="removeItem.bind(null, item)" :title="item.title" :toggle="markAs.bind(null, item)" :saveTitle="editItem.bind(null, item)"/>
    </div>
</template>

<script>
import TodoItem from './TodoItem.vue'
export default {
  name: 'Category',
  components: {
      TodoItem
  },
  props: {
      title: String,
      items: Array,
        toggle: Function,
        deleteCategory: Function
  },
  data: function(){
      return {
          filteredItems: this.items.filter((item) => item.title !== "")
      }
  },
  watch: {
      items: function(val){
          this.filteredItems = this.items.filter((item) => item.title !== "");
      }
  },
  methods: {
    markAs: function(item){
      this.$store.commit('markDone', item);
    },
    editItem: function(item, event){
        item['title'] = event.target.innerText;
        this.$store.commit('updateItem', item)
    },
    saveTitle: function(event){
        this.items.map((item) => item.category = event.target.innerText).forEach((item) => 
        this.$store.commit('updateItem', item))
    },
    removeItem: function(item){
        this.$store.commit('removeItem',item)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.category {
    display: flex;
    flex-direction: column;
}
.category > p {
    & > span {
    text-transform: capitalize;
    text-decoration: underline;
    }
    & > .link {
    text-decoration: none !important;
    }
}
.link {
    cursor: pointer;
    color: rgba(0, 0, 0, 1);
    &:hover {
        color: rgba(0, 0, 0, 0.7);
    }
}
</style>
