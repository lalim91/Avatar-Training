var first_card_clicked = null;
var second_card_clicked = null;
var back_first = null;
var back_second = null;
var total_possible_matches = 2;
var match_counter = 0;
var timer = 0;

$(document).ready(function(){
    $('.back').addClass('noMatch');//To flip back with later
    $('.back').click(function(){
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
        }
    })
});


    function compare(first_card_clicked,second_card_clicked){//this function is called above
        if(first_card_clicked == second_card_clicked){
            console.log('Hip hip hooray! A match!');
            $(back_first).removeClass('noMatch');//keep the back card hidden
            $(back_second).removeClass('noMatch');//keep the back card hidden
            match_counter += 1;
            console.log("match counter: " + match_counter);
            winner(match_counter,total_possible_matches);

        }else {
            console.log('Whoops, try again!');
            setTimeout(function(){
                $('.noMatch').show();//flip over again after 2 secs
            },2000);


        }
    }

        function winner(match_counter,total_possible_matches){//this function is called above
            if(match_counter == total_possible_matches){
                console.log("Congrats! You are a winner!");
            }else {
                return;
            }
        }









