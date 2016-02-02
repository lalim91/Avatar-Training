var first_card_clicked = null;
var second_card_clicked = null;
var back_first = null;
var back_second = null;
var total_possible_matches = 9;
var attempts = 0;
var accuracy = 0;
var matches = 0;
var games_played = 0;
var locked = false;

$(document).ready(function(){

    $('.reset').click(function(){
        games_played += 1;
        reset_stats();
        display_stats();
        $('.back').show();
        random();
    });

    random();
    $('.back').addClass('noMatch');//To flip back with later
    $('.back').click(function(){
        if (locked){
            return;
        }
        $(this).hide();


            if (first_card_clicked == null){
                first_card_clicked = $(this).prev().first().attr('src');//.prev= div.card;.first=img.front
                console.log('1st card');
                back_first = $(this);//stores the back card to flip later
            }else{
                second_card_clicked = $(this).prev().first().attr('src');//.prev= div.card;.first=img.front
                console.log('2nd card');
                back_second = $(this);//stores the back card to flip later

                compare(first_card_clicked,second_card_clicked);
                first_card_clicked = null;//refresh the variables for the next match
                second_card_clicked = null;//refresh the variables for the next match
                    console.log(first_card_clicked,second_card_clicked);

                back_first = null;//refresh the variables for the next match
                back_second = null;//refresh the variables for the next match
                    console.log(back_first,back_second);

            attempts += 1;
            calc_accuracy(matches,attempts);
            display_stats();
        }
    })
});


    function compare(first_card_clicked,second_card_clicked){//this function called in click function above
        locked = true;
        if(first_card_clicked == second_card_clicked){
            console.log('Hip hip hooray! A match!');
            $(back_first).removeClass('noMatch');//keep the back card hidden
            $(back_second).removeClass('noMatch');//keep the back card hidden
            matches += 1;
            console.log("match #:" + matches);
            winner(matches,total_possible_matches);
            locked = false;
        }else {
            console.log('Whoops, try again!');
            setTimeout(function(){
                $('.noMatch').show();//flip over again after 2 secs
                locked = false;
            },2000);

        }

    }

        function winner(matches,total_possible_matches){//this function is called in compare function above
            if(matches == total_possible_matches){
                console.log("Congrats! You are a winner!");
            }else {
            }
        }

function display_stats(){
    $('.games-played .value').text(games_played);
    $('.accuracy .value').text(accuracy + "%");
    $('.attempts .value').text(attempts);
}
function reset_stats(){
    accuracy = 0;
    matches = 0;
    attempts = 0;
    display_stats();
}

    function calc_accuracy(matches,attempts){//call after second card is picked
        accuracy = Math.round(matches/attempts * 100);

}


function random() {
    var parent = $("#game-area");
    var divs = parent.children();
    while (divs.length) {
        parent.append(divs.splice(Math.floor(Math.random() * divs.length), 1)[0]);
    }
}





