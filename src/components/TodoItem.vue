<template>
    <div class="item">
        <label class="checkbox-container" v-bind:class="{checked: done}">
            <span contenteditable="true" @blur="saveTitle">{{title}}</span>
            <input type="checkbox" :checked="done"  />
            <span class="checkmark" @click="toggle"></span>
            <a href="#" @click="removeItem" class="close"></a>
        </label>
    </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    title: String,
    done: Boolean,
    toggle: Function,
    saveTitle: Function,
    removeItem: Function
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.item {
    display: flex;
    align-items: center;
}
.checkmark {
    height: 25px;
    width: 25px;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #eee;
}
.checkbox-container {
    display: block;
    position: relative;
    padding-left: 35px;
    margin-bottom: 12px;
    cursor: pointer;
    font-size: 22px;
    user-select:none;
}
.checkbox-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}
.checkbox-container .checked {
    color: #7f8c8d;
    text-decoration: line-through;
}
.checkmark:hover input ~ .checkmark {
    background-color: #ccc;
}
.checkbox-container input:checked ~ .checkmark {
    background-color:#2980b9;
}
.checked {
    color: #7f8c8d;
    text-decoration: line-through;
}
.checkbox-container input:checked {
    text-decoration: line-through;
    color: #7f8c8d;
}
.checkmark::after {
    content: "";
    position:absolute;
    display: none;
}
.checkbox-container input:checked ~ .checkmark::after {
    display: block;
}
.checkbox-container .checkmark::after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
}
.close {
  width: 16px;
  height: 16px;
  opacity: 0.3;
}
.close:hover {
  opacity: 1;
}
.close:before, .close:after {
  position: absolute;
  right: -20px;
  top: 10px;
  content: ' ';
  height: 16px;
  width: 2px;
  background-color: #333;
}
.close:before {
  transform: rotate(45deg);
}
.close:after {
  transform: rotate(-45deg);
}

</style>
