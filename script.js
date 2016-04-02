/**
 * Created by Lalim on 3/30/16.
 */
var gameController = function (gameElement,statElement){
    var self = this;
    self.gameElement = $(gameElement);
    self.statElement = $(statElement);
    var cards = [];
    var frontObj = [];
    var frontImg = [];
    var randomFront = [];
    var backImg = [];
    var stats = [];
    var firstCardClicked = null;
    var secondCardClicked = null;
    var locked = false;
    this.createCards = function(height,width){
        for (var i = 0; i < height; i++) {
            var tr = $('<tr>');
            for(var j = 0;j <width;j++){
                var newCard = new cardGenerator();
                var cardElement = newCard.renderCard();
                cards.push(newCard);
                tr.append(cardElement);
            }
            self.gameElement.append(tr);
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
            newback = new backGenerator();
            backElement = newback.renderBackCard();
            backImg.push(backElement);
            cards[i].cardElement.append(randomFront[i]);
            cards[i].cardElement.append(backImg[i]);
        }

    };
    this.clearCards = function (){
        firstCardClicked = null;
        secondCardClicked = null;
    };

    this.compareCards = function (firstCard,secondCard){
      if (secondCard != null){
          locked = true;
          if (firstCard.cardElement[0].firstChild.currentSrc == secondCard.cardElement[0].firstChild.currentSrc){
              console.log ('Match!');
              $('.noMatch').removeClass('noMatch');
              sgSelf.matches();
              locked = false;
              game.clearCards();
          }else {
              console.log ('Try again!');
              setTimeout(function(){
                  $('.noMatch').removeClass('flipped');
                  locked = false;
              },2000);

             game.clearCards();
          }
      }
    };

    this.createStats = function (text,classAttr) {

        var newStats = new statGenerator(text, classAttr);
        stats.push(newStats);

    };

    this.makeStat = function () {
        for (var i in stats) {
            var element = stats[i].renderStats();
            self.statElement.append(element);
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

            cgSelf.cardElement.click(function(){
                if (locked == false){
                    cgSelf.addFlipCard();
                    cgSelf.assignCards();
                    game.compareCards(firstCardClicked,secondCardClicked);
                }

            });
            return cgSelf.cardContainer;
        };



        //this.returnCard = function () {
        //    return cgSelf.cardElement;
        //};


        this.addFlipCard = function (){
            cgSelf.cardElement.addClass('flipped '+'noMatch');

        };

        this.assignCards = function(){
            if (firstCardClicked == null){
                firstCardClicked = cgSelf;
                console.log('First Card Clicked ', firstCardClicked);
            }else {
                secondCardClicked = cgSelf;
                console.log('Second Card Clicked ', secondCardClicked);
            }
        };
    };


    var backGenerator = function (){
        var bgSelf = this;
        var backImgSrc = "image/airSymbol.png";
        bgSelf.backCard = null;
        this.renderBackCard = function (){
            var img = $('<img>');
            bgSelf.backCard = img.addClass('cardImg '+'back').attr('src',backImgSrc);
            return bgSelf.backCard;
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
    var statGenerator = function (text,classAttr){
        var sgSelf = this;
        var divStats = $('<div>');
        var statTitle = $('<h2>');
        var statResult = $('<h3>');
        sgSelf.text = text;
        sgSelf.classAttr = classAttr;
        sgSelf.match = 0;
        sgSelf.attempts = 0;

        this.renderStats = function(){
            sgSelf.statElement = divStats.addClass('stats');
            sgSelf.statElement.append(statTitle).text(sgSelf.text);
            sgSelf.statElement.append(statResult).addClass(sgSelf.classAttr);
        };

        this.matches = function (){
            sgSelf.match++;
        };
        this.returnMatches = function(){
            return sgSelf.match;
        }

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
    game = new gameController('#gameDiv','statsDiv');
    game.createCards(3,6);
    game.createFront(frontData);
    game.shuffleDeck();
    game.totalCard();
    game.createStats('Score','matches');
    game.createStats('Attempts','attempts');
    game.createStats('Accuracy','accuracy');
    game.makeStat();

});
