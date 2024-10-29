<template>
  <!-- <q-page padding> -->
  <div class="q-pa-md" style="max-width: 300px">
    <div class="q-gutter-md">
      <q-select v-model="model" :options="options" option-value="value" option-label="label" emit-value map-options>
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-select>
      <button @click="vertodo()">ver </button>
      <v-combobox dense filled solo v-model="model" :items="options2" label="opciones"></v-combobox>
      {{ model }}
    </div>

  </div>
  <!-- </q-page> -->
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Dashboard',

  data() {
    return {
      // endPoint: 'http://localhost:4000',
    }
  },
  setup() {
    return {

      model: ref(null),
      // options: [1, 2, 3],
      options: [
        {
          label: 'Actual',
          value: 1
        },
        {
          label: 'Semanal',
          value: 2
        },
        {
          label: 'Mensual',
          value: 3
        }
      ],
      options2: []

    }
  },
  created() {
    this.getTotales();
    // this.saveModel(this.model)
  },
  watch: {
    saveModel(val) {
      if (val != null) {
        console.log(val)
      } else {
        console.log('no se guarga nada ');
      }
    }
  },

  methods: {
    getTotales() {
      // console.log(this.options.length);
      for (let index = 0; index < this.options.length; index++) {
        // console.log(this.options[index].label);
        this.options2.push(this.options[index].label);
      }
      console.log(this.options2);
      // mostra
    },
    vertodo() {
      console.log(this.model);
    }
  },
})
</script>