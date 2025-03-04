<template>
    <div class="bg-white rounded-xl shadow-md p-4 mb-6">
        <div class="flex flex-wrap justify-center gap-4">
            <button
                v-for="section in sections"
                :key="section.value"
                @click="changeSection(section.value)"
                class="px-4 py-2 rounded-md transition duration-300"
                :class="
                currentSection === section.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'">
                {{ section.label }}
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';

export default defineComponent({
  name: 'Navigation',
  props: {
    currentSection: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      sections: [
        { value: 'intro', label: 'Introdução' },
        { value: 'qualitativa', label: 'Pesquisa Qualitativa' },
        { value: 'quantitativa', label: 'Pesquisa Quantitativa' },
        { value: 'atividade1', label: 'Atividade 1' },
        { value: 'atividade2', label: 'Atividade 2' },
        { value: 'ranking', label: 'Ranking' }
      ]
    }
  },
  methods: {
    ...mapMutations(['SET_CURRENT_SECTION']),
    changeSection(section: string) {
      this.SET_CURRENT_SECTION(section);
    }
  }
});
</script>
