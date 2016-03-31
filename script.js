/**
 * Created by Lalim on 3/30/16.
 */
var gameController = function (element){
    var self = this;
    self.element = element;
    var cards = [];
    this.createCards = function(){
        var newCard = new cardGenerator();
        cards.push(newCard);
    };
    var cardGenerator = function(){
        var cgSelf = this;
        cgSelf.cardElement = null;
        this.renderCard = function(){
            cgSelf.cardElement = $('<div>').addClass('card');
            return cgSelf.cardElement;
        }
    };
    var statGenerator = function (){
        var sgSelf = this;

    }
};




