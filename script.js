/**
 * Created by Lalim on 3/30/16.
 */
var gameController = function (element){
    var self = this;
    self.element = $(element);
    var cards = [];
    var frontObj = [];
    var frontImg = [];
    var randomFront = [];
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
    this.createFront = function(frontData){
        var newFront = null;
        var frontElement = null;
        for(var i = 0; i < frontData.length; i++){
            for(var j = 1;j < cards.length && frontData[i].frontCount > 0; j++){
                frontData[i].frontCount--;
                newFront = new frontGenerator();
                frontElement = newFront.renderFrontCard();
                frontElement.attr('src',frontData[i].frontSrc);
                frontObj.push(newFront);
                frontImg.push(frontElement);
            }
        }
        console.log('frontObj array contains', frontObj);
        console.log('frontImg array contains', frontImg);
    };
    this.shuffleDeck = function(){
        randomFront = frontImg.slice(0);
        for (var i = randomFront.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = randomFront[i];
            randomFront[i] = randomFront[j];
            randomFront[j] = temp;
        }
        console.log(randomFront);
        return randomFront;
    };
    this.totalCard = function (){
        var newback = null;
        var backElement = null;
        for(var i = 0; i < cards.length; i++){
            for (var j = 0; j < randomFront.length; j++){
                newback = new backGenerator();
                backElement = newback.renderBackCard();
            }
            cards[i].cardElement.append(randomFront[j]);
            cards[i].cardElement.append(backElement);

        }
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
    var frontGenerator = function (){
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

var frontData = [
    {
        frontSrc:'image/Uncle_Iroh.png',
        frontCount:2
    },
    {
        frontSrc:'image/toph.png',
        frontCount:2
    },
    {
        frontSrc:'image/sokka.png',
        frontCount:2
    },
    {
        frontSrc:'image/Momo.png',
        frontCount:2
    },
    {
        frontSrc:'image/Katara.png',
        frontCount:2
    },
    {
        frontSrc:'image/bumi.png',
        frontCount:2
    },
    {
        frontSrc:'image/appa.png',
        frontCount:2
    },
    {
        frontSrc:'image/aang.png',
        frontCount:2
    },
    {
        frontSrc:'image/avatar.png',
        frontCount:2
    }
];


var game;
$(document).ready(function(){
    game = new gameController('#gameDiv');
    game.createCards(3,6);
    game.createFront(frontData);
    game.shuffleDeck();
    game.totalCard();


});
