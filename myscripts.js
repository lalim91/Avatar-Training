var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;


$(document).ready(function(){
    /*I tried making a global var for the class "back" (var card = $('.body'))
     but the substitution wouldn't happen*/
    $('.card').click(function(){
        card_clicked(this);
    });
});



function card_clicked(element) {
    var card_flipped= $(element).find('.back').hide();



    /*if (first_card_clicked != null) {
        first_card_clicked = card_flipped;
    } else {
        second_card_clicked = card_flipped;
        if(first_card_clicked == second_card_clicked){
            match_counter += 1;
            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter == total_possible_matches) {
                console.log("Yay! You won!");
            }
        }else {
            setTimeout(flip_back, 2000);
            function flip_back () {
                $('.back').show();
            }

        }
    }*/
}