/**
 * Created by Lalim on 3/30/16.
 */
var gameController = function (gameElement,statElement,modalElement){
    var self = this;
    self.gameElement = $(gameElement);
    self.statElement = $(statElement);
    self.modalElement = $(modalElement);
    var cards = [];
    var frontObj = [];
    var frontImg = [];
    var randomFront = [];
    var backImg = [];
    var stats = [];
    var firstCardClicked = null;
    var secondCardClicked = null;
    var locked = false;
    var matches = 0;
    var attempts = 0;
    var accuracy = null;
    this.cardCreationProcess = function(){
        self.createCards(3,6);
        self.createFront(frontData);
        self.shuffleDeck();
        self.totalCard();

    };
    this.statCreationProcess = function (){
        self.createStats('Score','matches');
        self.createStats('Attempts','attempts');
        self.createStats('Accuracy','accuracy');
        self.makeStat();
        self.hideModel();
        self.displayStats();
    };

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
    this.tryAgain = function (firstCard,secondCard){
        firstCard.flipBack();
        secondCard.flipBack();
        firstCard.clicked = true;
        secondCard.clicked = true;
    };

    this.compareCards = function (firstCard,secondCard){
        //this.card = card;
      if (secondCard != null){
          locked = true;
          if (firstCard.cardElement[0].firstChild.currentSrc == secondCard.cardElement[0].firstChild.currentSrc){
              //$('.noMatch').removeClass('noMatch');
              matches++;
              console.log('matches:', matches);
              firstCard.matchAnimate();
              secondCard.matchAnimate();
              self.winCondition();
              self.clearCards();
          }else {
              console.log ('Try again!');
              self.tryAgain(firstCardClicked,secondCardClicked);
              self.clearCards();
          }
          self.calculateAccuracy();
          self.displayStats();
      }
    };

    this.createStats = function (text,classAttr) {

        var newStats = new statGenerator(text, classAttr);
        stats.push(newStats);

    };

    this.makeStat = function () {
        for (var i in stats) {
            var x = stats[i].renderStats();
            self.statElement.append(x);
        }
    };

    this.calculateAccuracy = function (){
        accuracy = Math.round(matches/attempts * 100);
        console.log(accuracy);
        var acc = accuracy + "%";
        if (attempts > 0){
            return acc;
        }
    };

    this.displayStats =function (){
        $('.matches').text(matches);
        $('.attempts').text(attempts);
        $('.accuracy').text(this.calculateAccuracy());
    };

    this.resetStats = function (){
        matches = 0;
        attempts = 0;
        accuracy = null;
        self.displayStats();
    };

    //this.resetBoard = function(height,width){
    //    for (var i = 0; i < height; i++) {
    //        var tr = $('<tr>');
    //        for(var j = 0;j <width;j++){
    //            tr.append(cards[i]);
    //        }
    //        self.gameElement.append(tr);
    //    }
    //};

    this.resetGame = function (){
        $('.btn').click(function(){
            self.gameElement.empty();
            cards = [];
            self.clearCards();
            self.cardCreationProcess();
            self.resetStats();
        })
    };
    this.hideModel = function (){
        self.modalElement.modal({
            show: false
        })
    };

    this.winCondition = function (){
        if(matches == cards.length/2){
            self.modalElement.modal({
                show: true
            })
        }
    };

    var cardGenerator = function(){
        var cgSelf = this;
        cgSelf.cardContainer = null;
        cgSelf.cardElement = null;
        cgSelf.clicked = true;


        this.renderCard = function(){
            var divCon = $('<div>');
            var divCard = $('<div>');
            cgSelf.cardElement = divCard.addClass('card');
            cgSelf.cardContainer = divCon.addClass('containers');
            cgSelf.cardContainer.append(cgSelf.cardElement);
            cgSelf.cardElement.on('click', function(){
                cgSelf.enableClick();
            });

            return cgSelf.cardContainer;
        };



        //this.returnCard = function () {
        //    return cgSelf.cardElement;
        //};

        this.cardClickHandler = function (){
            if (locked == false){
                cgSelf.addFlipCard();
                cgSelf.assignCards();
                game.compareCards(firstCardClicked,secondCardClicked);
            }
        };

        //this.disableClick = function (){
        //    $('.clicked').removeClass('clicked');
        //};

        this.enableClick = function (){
            if (cgSelf.clicked === false) {
                return;
            }else{
                cgSelf.cardClickHandler();
            }
        };

        this.addFlipCard = function (){
            cgSelf.cardElement.addClass('flipped');
        };
        this.flipBack= function(){
            setTimeout(function(){
                locked = false;
                cgSelf.cardElement.removeClass('flipped');
            },2000);
        };

        this.assignCards = function(){
            if (firstCardClicked == null){
                cgSelf.clicked = false;
                firstCardClicked = cgSelf;
                console.log('First Card Clicked ', firstCardClicked);
            }else {
                cgSelf.clicked = false;
                secondCardClicked = cgSelf;
                console.log('Second Card Clicked ', secondCardClicked);
                attempts++;
                console.log('attempts:', attempts);

            }
        };
        this.matchAnimate = function (){
            cgSelf.cardElement.addClass('wind');
            setTimeout(function(){
                cgSelf.cardElement.fadeOut();
                locked = false;
            },2000);
        }

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
        sgSelf.statElement = null;
        sgSelf.titleElement = null;
        sgSelf.resultElement = null;

        this.renderStats = function(){
            sgSelf.statElement = divStats.addClass('stats');
            sgSelf.titleElement = statTitle.text(sgSelf.text);
            sgSelf.resultElement = statResult.addClass(sgSelf.classAttr);
            sgSelf.statElement.append(sgSelf.titleElement);
            sgSelf.statElement.append(sgSelf.resultElement);
            return sgSelf.statElement;
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
        frontSrc:'image/aangflying.png',
        frontCount:2
    },
    {
        frontSrc:'image/avatar.png',
        frontCount:2
    }
];


var game;
$(document).ready(function(){
    game = new gameController('#gameDiv','#statsDiv','#modalElement');
    game.cardCreationProcess();
    game.statCreationProcess();
    game.resetGame();
});
