// 1.Função para buscar resultados do Google por região específica
function buscarResultadosGoogle(regiao) {
  // Substitua 'SUA_CHAVE_DE_API' pela sua chave de API do Google
  var chaveAPI = 'SUA_CHAVE_DE_API';
  // Substitua 'SEU_ID_DE_SEARCH_ENGINE' pelo ID do mecanismo de pesquisa personalizado do Google
  var idSearchEngine = 'SEU_ID_DE_SEARCH_ENGINE';
  // Substitua 'div_resultados' pelo ID da div onde você quer exibir os resultados
  var divResultados = document.getElementById('div_resultados');

  // Construir a URL da API de Pesquisa do Google
  var url = 'https://www.googleapis.com/customsearch/v1?key=' + chaveAPI + '&cx=' + idSearchEngine + '&q=' + encodeURIComponent(regiao);

  // Fazer uma requisição AJAX para buscar os resultados
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
          var resposta = JSON.parse(xhr.responseText);
          var itens = resposta.items;
          var html = '';

          // Montar os resultados em HTML
          for (var i = 0; i < itens.length; i++) {
              var item = itens[i];
              html += '<p><a href="' + item.link + '">' + item.title + '</a></p>';
              html += '<p>' + item.snippet + '</p>';
          }

          // Exibir os resultados na div
          divResultados.innerHTML = html;
      }
  };
  xhr.send();
}

// Exemplo de uso: buscar resultados para 'tecnologia' na região 'Brasil'
buscarResultadosGoogle('tecnologia Brasil');

// ---------------------------------------------------------------------- //


// 2.Função para buscar resultados do Google por região específica
function buscarResultadosGoogle(regiao, start) {
  var chaveAPI = 'SUA_CHAVE_DE_API';
  var idSearchEngine = 'SEU_ID_DE_SEARCH_ENGINE';
  var divResultados = document.getElementById('div_resultados');

  var numResultadosPorPagina = 10; // Número de resultados por página
  var startIndex = start || 1; // Índice do primeiro resultado a ser buscado

  var url = 'https://www.googleapis.com/customsearch/v1?key=' + chaveAPI + '&cx=' + idSearchEngine + '&q=' + encodeURIComponent(regiao) + '&start=' + startIndex + '&num=' + numResultadosPorPagina;

  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
          var resposta = JSON.parse(xhr.responseText);
          var itens = resposta.items;
          var html = '';

          // Montar os resultados em HTML
          for (var i = 0; i < itens.length; i++) {
              var item = itens[i];
              if (item.displayLink) { // Verificar se é um resultado orgânico
                  html += '<p><a href="' + item.link + '">' + item.title + '</a></p>';
                  html += '<p>' + item.snippet + '</p>';
              }
          }

          // Exibir os resultados na div
          divResultados.innerHTML += html;

          // Verificar se há mais páginas de resultados e buscar mais se necessário
          if (resposta.queries.nextPage) {
              var nextPageStart = resposta.queries.nextPage[0].startIndex;
              buscarResultadosGoogle(regiao, nextPageStart);
          }
      }
  };
  xhr.send();
}

// Exemplo de uso: buscar resultados para 'tecnologia' na região 'Brasil'
buscarResultadosGoogle('tecnologia Brasil');

