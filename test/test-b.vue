<template>
  <v-ons-page :infinite-scroll="loadMore">
    <v-ons-list class="bg-trans">
      <pull-hook :on-action="onAction"></pull-hook>

      <div
        style="text-align: center; margin: 40px; color: #666"
        v-if="isLoading"
      >
        <p><v-ons-progress-circular indeterminate></v-ons-progress-circular></p>
      </div>

      <template v-for="(item, $key) in list" v-if="!isLoading">
        <v-ons-list-title
          >Fecha {{ new Date($key) | (morph - date("DD-MM-YYYY")) }}</v-ons-list-title
        >
        <v-ons-list modifier="inset">
          <item-partido
            v-for="(partido, index) in list[$key]"
            :key="index"
            :partido="partido"
          ></item-partido>
        </v-ons-list>
      </template>
    </v-ons-list>
  </v-ons-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import ItemPartido from "./itemPartido";
import PullHook from "./pull-hook";

export default {
  name: "TabPartidosPasados",
  components: {
    ItemPartido,
    PullHook
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("torneo", ["filterTorneos"]),
    ...mapGetters("fixture", ["isLoading", "page", "tab"]),
    ...mapGetters("fixture", {
      list: "listPasados"
    })
  },
  methods: {
    ...mapActions("fixture", {
      loadPartidos: "loadListPartidosPasados",
      cleanList: "cleanList"
    }),
    loadMore(done) {
      // La pagina 0 es la primera en obtenerse, en caso de no actualizace fuerzo a la sigiente.
      const page = this.page === 0 ? 1 : this.page;
      this.loadPartidos({ page, filter: this.filterTorneos }).finally(() => {
        done();
      });
    },
    onAction(done) {
      setTimeout(() => {
        this.loadPartidos({ page: 0, filter: this.filterTorneos }).finally(
          () => {
            done();
          }
        );
      }, 1000);
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.loadPartidos({ page: 0 });
    });
  }
};
</script>

<style scoped>
.text-center {
  text-align: "center";
}

.list-item--material {
  padding: 0 0 0 6px;
}

ons-list.bg-trans {
  background-color: transparent;
}
</style>
