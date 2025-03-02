<template>
    <div class="bg-white rounded-xl shadow-md p-6 mb-6">
        <h2 class="text-2xl font-bold text-blue-600 mb-4">O que é Pesquisa Científica?</h2>
        <div class="prose max-w-none">
            <p class="mb-4">
                A pesquisa científica é um processo sistemático de investigação que busca descobrir, interpretar ou
                revisar
                fatos, teorias ou aplicações. É através da pesquisa científica que podemos expandir nosso conhecimento e
                encontrar soluções para diversos problemas.
            </p>

            <h3 class="text-xl font-bold text-blue-600 mb-2 mt-6">Características da Pesquisa Científica:</h3>
            <ul class="list-disc pl-6 mb-4">
                <li class="mb-2">
                    <span class="font-semibold">Sistematização:</span> Segue métodos e procedimentos específicos
                </li>
                <li class="mb-2">
                    <span class="font-semibold">Objetividade:</span> Busca minimizar influências pessoais nos resultados
                </li>
                <li class="mb-2">
                    <span class="font-semibold">Verificabilidade:</span> Outros pesquisadores podem reproduzir o estudo
                </li>
                <li class="mb-2">
                    <span class="font-semibold">Confiabilidade:</span> Utiliza técnicas reconhecidas pela comunidade
                    científica
                </li>
            </ul>

            <h3 class="text-xl font-bold text-blue-600 mb-2 mt-6">Dois Principais Tipos:</h3>
            <p class="mb-4">
                As pesquisas científicas podem ser classificadas de várias formas, mas dois tipos principais são:
            </p>

            <div class="grid md:grid-cols-2 gap-4 mb-6">
                <div class="bg-blue-100 p-4 rounded-lg">
                    <h4 class="font-bold text-blue-700">Pesquisa Qualitativa</h4>
                    <p>Foca em aspectos subjetivos, interpretações e compreensão profunda dos fenômenos.</p>
                </div>
                <div class="bg-green-100 p-4 rounded-lg">
                    <h4 class="font-bold text-green-700">Pesquisa Quantitativa</h4>
                    <p>Baseada em dados numéricos, estatísticas e medições objetivas dos fenômenos.</p>
                </div>
            </div>

            <p>
                Clique nos botões acima para aprender mais sobre cada tipo de pesquisa e participar das atividades!
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'IntroSection'
});
</script>
