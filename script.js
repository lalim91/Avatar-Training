/**
 * Created by Lalim on 3/30/16.
 */
var gameController = function (element){
    var self = this;
    self.element = $(element);
    var cards = [];
    this.createCards = function(height,width){
        for (var i = 0; i < height; i++) {
            var tr = $('<tr>');
            for(var j = 0;j <width;j++){
                var newCard = new cardGenerator();
                var cardElement = newCard.renderCard();
                cards.push(newCard);
                tr.append(cardElement);
            }
            self.element.append(tr);
        }
    };
    this.createFaces = function(){

    };

    var cardGenerator = function(){
        var cgSelf = this;
        cgSelf.cardContainer = null;
        cgSelf.cardElement = null;

        this.renderCard = function(){
            var divCon = $('<div>');
            var divCard = $('<div>');
            cgSelf.cardElement = divCard.addClass('card');
            cgSelf.cardContainer = divCon.addClass('container');
            cgSelf.cardContainer.append(cgSelf.cardElement);
            return cgSelf.cardContainer;
        }
    };

    var backGenerator = function (){
        var bgSelf = this;
        var backImgSrc = "image/airSymbol.png";
        bgSelf.backCard = null;
        this.renderBackCard = function (){
            var img = $('<img>');
            bgSelf.backCardImg = img.addClass('cardImg').attr('src',backImgSrc);
            return bgSelf.backCardImg;
        }

    };
    var frontGenerator = function (frontData){
        var fgSelf = this;
        fgSelf.frontCard = null;
        this.renderFrontCard = function (){
            var img = $('<img>');
            fgSelf.frontCard = img.addClass('cardImg '+ 'front');
            return fgSelf.frontCard;
        }

    };
    var statGenerator = function (){
        var sgSelf = this;

    }
};


var game;
$(document).ready(function(){
    game = new gameController('#gameDiv');
    game.createCards(3,6);

});


