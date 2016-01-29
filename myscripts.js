var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;


$(document).ready(function(){
    $('.back').click(card_clicked);
});



function card_clicked() {
   var card_flipped = $(this).hide();

    if (first_card_clicked != null) {
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

        }
    }
}