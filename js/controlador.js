angular.module('buscaTabu', []);
angular.module('buscaTabu').controller('calculo', function ($scope) {

    //Se passar do número estipulado aqui e o sistema não achar a solução, daí ele considera a ultima solução boa.
    $scope.maxInteracoes = 5;

    // Definindo o valor de alpha.
    $scope.alpha = 15;

    // Definindo o valor de alpha.
    $scope.pesoMaximo = 23;

    //Iniciando a tabela de objetos com 1 objeto.
    $scope.objetos = [
        {objeto: "Objeto 1", peso: 1, beneficio: 1},
        {objeto: "Objeto 2", peso: 1, beneficio: 1},
        {objeto: "Objeto 3", peso: 1, beneficio: 1}
    ];

    // Essa função corrige o problema do campo number da tabela.
    $scope.tipo = function(indice){
        return (indice === 0 ? "text" : "number");
    };

    // Definindo o valor inicial da solução.
    // $scope.solucaoInicial = [0, 1, 0, 1, 0];
    $scope.solucaoInicial = [0, 0, 1];

    // Definindo o valor inicial da melhor solução.
    $scope.melhorSolucao = {vizihos: [], solucao: [], fs: 0, tabu: 0};

    // Definindo o valor inicial do tabu.
    $scope.tabu = 0;

    //Array contendo todas as soluções.
    $scope.todasSolucoes = [];

    //Array contendo todas as matrizes de vizinhos.
    $scope.todosVizinhos = [];

    /**
     * INTERAÇÕES DOS BOTÕES
     */
    $scope.result = 0;

    /**
     * Criado para recuar ao clicar no botão "Interação anterior" na tabela de resultados.
     */
    $scope.interacaoAnterior = function () {
        if ($scope.result > 0) {
            $scope.result -= 1;
        }
    };

    /**
     * Criado para avancar ao clicar no botão "Interação seguinte" na tabela de resultados.
     */
    $scope.interacaoSeguinte = function () {
        if ($scope.result < $scope.todasSolucoes.length - 1) {
            $scope.result += 1;
        }
    };


    /**
     * Adiciona um campo na tabela de objetos e adiciona um valor na solução inicial.
     */
    $scope.addCampo = function () {

        var novo = {objeto: "Objeto " + ($scope.objetos.length + 1), peso: 0, beneficio: 0};
        $scope.objetos.push(novo);
        $scope.solucaoInicial.push(0);
    };


    /**
     * Remove o ultimo campo da tabela de objetos e remove o ultimo valor da solução inicial.
     */
    $scope.removeCampo = function () {
        $scope.objetos.pop();
        $scope.solucaoInicial.pop();
    };


    /**
     * Esse método inicia uma matriz de elementos já ordenando os vizinhos.
     * @param {Array} solucaoTemporaria É um Array contendo a solução inicial.
     * @returns {Array} Array contendo a distriuição dos "vizinhos".
     */
    function gerarMatrizVizinhos(solucaoTemporaria) {
        var matrizVizinhos = [], aux, x;
        for (x = 0; x < solucaoTemporaria.length; x++) {

            aux = angular.copy(solucaoTemporaria);
            aux[x] = (aux[x] === 0 ? 1 : 0);
            matrizVizinhos.push(aux);
        }
        return matrizVizinhos;
    }


    /**
     * 
     * @param {Array} matrizVizinhos contendo a matriz com os "vizinhos" já ordenados
     * @param {Array} objetos é um Array que contém os objetos e seus dados.
     * @returns {Array} Retorna um Array contendo a matriz com os "vizinhos" e os dados de peso, benefício e f(s) calculados.
     */
    function obterResultado(matrizVizinhos, objetos) {

        var i, k, valorPeso, valorBeneficio, valorSolucao;
        for (i = 0; i < matrizVizinhos.length; i++) {
            valorPeso = 0;
            valorBeneficio = 0;
            valorSolucao = 0;
            for (k = 0; k < matrizVizinhos[i].length; k++) {

                if (matrizVizinhos[i][k] === 1) {
                    valorPeso += objetos[k].peso;
                    valorBeneficio += objetos[k].beneficio;
                }
            }
            valorSolucao = ((valorPeso - $scope.pesoMaximo) < 0 ? 0 : (valorPeso - $scope.pesoMaximo));
            valorSolucao = valorBeneficio - $scope.alpha * (valorSolucao);

            matrizVizinhos[i].push(valorBeneficio);
            matrizVizinhos[i].push(valorPeso);
            matrizVizinhos[i].push(valorSolucao);
        }
        return matrizVizinhos;
    }


    /**
     * Define o "tabu" e "F(s" de maior valor positivo.
     * @param {type} matrizVizinhos Recebe a matriz completa de "vizinhos".
     * @returns {Object} Retorna um objeto contendo o "tabu" e "F(s)" da matriz de "vizinhos" passada.
     */
    function obterTabu(matrizVizinhos) {
        var i, tabu = {};
        tabu.max = 0;
        for (i = 0; i < matrizVizinhos.length; i++) {
            if (matrizVizinhos[i][matrizVizinhos[i].length - 1] > tabu.max) {
                tabu.tabu = i + 1;
                tabu.max = matrizVizinhos[i][matrizVizinhos[i].length - 1];
            }
        }

        if (tabu.tabu === $scope.tabu) {
            matrizVizinhos[tabu.tabu - 1][matrizVizinhos[0].length - 1] = 0;
            tabu = obterTabu(matrizVizinhos);
        }
        return tabu;
    }


    
});