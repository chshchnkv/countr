'use strict';
(function(gl) {
  var gamesContainer = document.querySelector('.countr-header__games');
  var allGames = gl.Countr.prototype.availableGames;
  for (var i = 0; i < allGames.length; i++) {
    gamesContainer.appendChild(getGameElementFromTemplate(allGames[i], i));
  }

  /*global getElementFromTemplate*/
  function getGameElementFromTemplate(game, gameId) {
    var gameElement = getElementFromTemplate('game');
    if (gameElement) {
      gameElement.textContent = game.name;
      gameElement.dataset.game = gameId;

      if (game === gl.Countr.prototype.currentGame) {
        gameElement.classList.add('countr-games__item--active');
      }
    }
    gameElement.addEventListener('click', function() {
      var gameToPlay = allGames[this.dataset.game];
      gl.Countr.prototype.currentGame = gameToPlay;
      var activeGameElement = gamesContainer.querySelector('.countr-games__item--active');
      if (activeGameElement) {
        activeGameElement.classList.remove('countr-games__item--active');
      }
      gameElement.classList.add('countr-games__item--active');
      var curGameTitle = document.querySelector('.countr-header__current-game');
      curGameTitle.textContent = gameToPlay.name;
      gamesContainer.classList.toggle('hidden');
    });
    return gameElement;
  }
})(window);
