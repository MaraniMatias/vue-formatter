<template>undefined</template>

<script>
import { mapGetters, mapActions } from 'vuex';

import ItemPartido from "./itemPartido";
import PullHook from "./pull-hook";

export default {
  name: 'TabPartidosPasados',
  components: {
    ItemPartido,
    PullHook
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters('torneo', [
      'filterTorneos'
    ]),
    ...mapGetters('fixture', [
      'isLoading',
      'page',
      'tab'
    ]),
    ...mapGetters('fixture', {
      list: 'listPasados'
    })
  },
  methods: {
    ...mapActions('fixture', {
      loadPartidos: 'loadListPartidosPasados',
      cleanList: 'cleanList'
    }),
    loadMore(done) {
      // La pagina 0 es la primera en obtenerse, en caso de no actualizace fuerzo a la sigiente.
      const page = this.page === 0 ? 1 : this.page;
      this.loadPartidos({ page, filter: this.filterTorneos })
        .finally(() => {
          done();
        });
    },
    onAction(done) {
      setTimeout(() => {
        this.loadPartidos({ page: 0, filter: this.filterTorneos })
          .finally(() => {
            done();
          });
      }, 1000);
    },
  },
  mounted() {
    this.$nextTick(function () {
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
