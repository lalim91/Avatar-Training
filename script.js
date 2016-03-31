/**
 * Created by Lalim on 3/30/16.
 */
var gameController = function (element){
    var self = this;
    self.element = $(element);
    var cards = [];
    this.createCards = function(){
        var newCard = new cardGenerator();
        cards.push(newCard);
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
            cgSelf.cardContainer.append(cg.cardElement);
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




