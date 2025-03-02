<template>
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 class="text-2xl font-bold text-blue-600 mb-4">Pesquisa Qualitativa</h2>
        <div class="prose max-w-none">
            <p class="mb-4">
                A pesquisa qualitativa foca na compreensão profunda de fenômenos sociais, comportamentos humanos e
                experiências subjetivas. Em vez de números e estatísticas, ela trabalha com palavras, observações e
                interpretações.
            </p>

            <div class="bg-blue-100 p-4 rounded-lg mb-6">
                <h3 class="text-xl font-bold text-blue-600 mb-2">Características Principais:</h3>
                <ul class="list-disc pl-6">
                    <li class="mb-2">
                        <span class="font-semibold">Subjetividade:</span> Valoriza as perspectivas e experiências
                        individuais
                    </li>
                    <li class="mb-2">
                        <span class="font-semibold">Profundidade:</span> Busca explorar em detalhes um fenômeno ou
                        situação
                    </li>
                    <li class="mb-2">
                        <span class="font-semibold">Flexibilidade:</span> Adaptável durante o processo de pesquisa
                    </li>
                    <li class="mb-2">
                        <span class="font-semibold">Contextualização:</span> Considera o ambiente e as circunstâncias
                    </li>
                </ul>
            </div>

            <h3 class="text-xl font-bold text-blue-600 mb-2">Métodos Comuns:</h3>
            <div class="grid md:grid-cols-2 gap-4 mb-6">
                <div class="bg-white border border-blue-200 p-3 rounded-lg shadow-sm">
                    <h4 class="font-bold text-blue-700">Entrevistas</h4>
                    <p>Conversas estruturadas ou semi-estruturadas com participantes</p>
                </div>
                <div class="bg-white border border-blue-200 p-3 rounded-lg shadow-sm">
                    <h4 class="font-bold text-blue-700">Grupos Focais</h4>
                    <p>Discussões em grupo sobre um tema específico</p>
                </div>
                <div class="bg-white border border-blue-200 p-3 rounded-lg shadow-sm">
                    <h4 class="font-bold text-blue-700">Observação Participante</h4>
                    <p>O pesquisador se insere no ambiente estudado</p>
                </div>
                <div class="bg-white border border-blue-200 p-3 rounded-lg shadow-sm">
                    <h4 class="font-bold text-blue-700">Análise de Conteúdo</h4>
                    <p>Interpretação sistemática de textos, imagens ou vídeos</p>
                </div>
            </div>

            <h3 class="text-xl font-bold text-blue-600 mb-2">Exemplo Prático:</h3>
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <p>
                    Um pesquisador que quer entender como estudantes se sentem em relação ao ensino remoto pode realizar
                    entrevistas detalhadas com 15 alunos, pedindo que descrevam suas experiências, desafios e
                    percepções.
                </p>
            </div>

            <p class="italic text-gray-600">
                Vá para a seção "Atividade 1" para testar seus conhecimentos sobre pesquisa qualitativa!
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'QualitativaSection'
});
</script>
