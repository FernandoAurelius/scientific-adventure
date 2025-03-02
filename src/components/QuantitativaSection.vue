<template>
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 class="text-2xl font-bold text-green-600 mb-4">Pesquisa Quantitativa</h2>
        <div class="prose max-w-none">
            <p class="mb-4">
                A pesquisa quantitativa trabalha principalmente com dados numéricos e análises estatísticas. Seu
                objetivo é medir, quantificar e estabelecer relações entre variáveis através de métodos matemáticos.
            </p>

            <div class="bg-green-100 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-bold text-green-600 mb-2">Características Principais:</h3>
                <ul class="list-disc pl-6">
                    <li class="mb-2">
                        <span class="font-semibold">Objetividade:</span> Busca minimizar a influência do pesquisador
                    </li>
                    <li class="mb-2">
                        <span class="font-semibold">Mensuração:</span> Traduz fenômenos em números e estatísticas
                    </li>
                    <li class="mb-2">
                        <span class="font-semibold">Amostragem:</span> Trabalha com grupos representativos da população
                    </li>
                    <li class="mb-2">
                        <span class="font-semibold">Generalização:</span> Procura estabelecer padrões aplicáveis a
                        grupos maiores
                    </li>
                </ul>
            </div>

            <h3 class="text-xl font-bold text-green-600 mb-2">Métodos Comuns:</h3>
            <div class="grid md:grid-cols-2 gap-4 mb-6">
                <div class="bg-white border border-green-200 p-3 rounded-lg shadow-sm">
                    <h4 class="font-bold text-green-700">Surveys/Questionários</h4>
                    <p>Coleta de dados estruturados de muitos participantes</p>
                </div>
                <div class="bg-white border border-green-200 p-3 rounded-lg shadow-sm">
                    <h4 class="font-bold text-green-700">Experimentos</h4>
                    <p>Testes controlados para verificar relações de causa e efeito</p>
                </div>
                <div class="bg-white border border-green-200 p-3 rounded-lg shadow-sm">
                    <h4 class="font-bold text-green-700">Análise Estatística</h4>
                    <p>Uso de métodos matemáticos para interpretar dados</p>
                </div>
                <div class="bg-white border border-green-200 p-3 rounded-lg shadow-sm">
                    <h4 class="font-bold text-green-700">Censo</h4>
                    <p>Coleta de dados de toda uma população</p>
                </div>
            </div>

            <h3 class="text-xl font-bold text-green-600 mb-2">Exemplo Prático:</h3>
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <p>
                    Um pesquisador que quer entender o impacto do ensino remoto pode aplicar um questionário a 500
                    alunos, com perguntas sobre notas, horas de estudo e satisfação em escalas numéricas, analisando
                    depois as correlações estatísticas.
                </p>
            </div>

            <p class="italic text-gray-600">
                Vá para a seção "Atividade 2" para testar seus conhecimentos sobre pesquisa quantitativa!
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'QuantitativaSection'
});
</script>
