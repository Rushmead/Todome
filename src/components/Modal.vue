<template>
    <transition name="modal" v-if="visible">
        <div class="modal-mask" @click="closeModal">
            <div class="modal modal-wrapper">
                <div class="modal modal-container">
                    <div class="modal modal-header">
                        <slot name="header"></slot>
                    </div>
                    <div class="modal modal-body">
                        <slot name="body"></slot>
                    </div>
                    <div class="modal modal-footer">
                        <slot name="footer">
                            <button class="close-modal-button" @click="$emit('close')">Ok</button>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
  export default {
    name: 'Modal',
    props: ['visible'],
    methods: {
      closeModal: function(event){
        if(event.target.classList.contains("modal-mask")){
          this.$emit('close');
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        transition: opacity .3s ease;
        justify-content: center;
        align-items: center;
    }
    .modal-wrapper  {
        flex-direction: column;
        vertical-align: middle;
    }
    .modal-container  {
        display: flex;
        flex-direction: column;
        max-width: 700px;
        margin: 0px auto;
        padding: 20px 30px;
        background-color: #fff;
        border-radius: 2px;
        box-shadow: 0 2px 8px rgba(0,0,0,.33);
        transition: all .3s ease;
    }
    .modal-header {
        margin-top: 0;
    }
    .modal-body {
        margin: 20px 0;
    }
    .modal-footer {
        margin-top: auto;
    }
    .close-modal-button {
        float: right;
        background-color: rgba(255, 64, 49, 1);
        color: #fff;
        text-align:center;
        border: none;
        padding: 10px 25px;
        font-size: 16px;
        font-weight: bold;
        text-transform: uppercase;
        cursor: pointer;
        &:hover {
             background-color: rgba(255, 64, 49, 0.6)
         }
    }
    .modal-enter {
        opacity: 0;
    }
    .modal-leave-active {
        opacity: 1;
    }
    .modal-enter .modal-container, .modal-leave-active .modal-container {
        -webkit-transform: scale(1.1);
        -moz-transform: scale(1.1);
        -ms-transform: scale(1.1);
        -o-transform: scale(1.1);
        transform: scale(1.1);
    }

</style>