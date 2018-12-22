<template>
  <section class="hero is-danger is-fullheight">
    <div class="notification is-warning" v-show="!connectivityStatus">
      <button class="delete"></button> {{ connectivityText }}
    </div>
    <div class="hero-body">
      <div class="container">
        <div class="level">
          <div class="level-item has-text-centered">
            <div>
              <status :progress="progress"></status>
              <h1 class="title">{{ statusText }}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Status from "@/components/Status";

export default {
  data() {
    return {
      statusText: "",
      progress: 0,
      connectivityText: "",
      connectivityStatus: true
    };
  },
  created() {
    this.statusText = "Hola";
    this.progress = 50;
  },
  components: {
    status: Status
  }
};
</script>

<styles src="../node_modules/bulma/css/bulma.css"></styles>
