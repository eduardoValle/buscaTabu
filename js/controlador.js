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

    
});