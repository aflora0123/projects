// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

/*    JS of Michael Stadler    */

/*--------------------------*/
/*    Table of Contents        */
/*--------------------------*/
/*    .Plugin JS                */
/*    .Customization            */
/*--------------------------*/

/*    .Plugin JS */
/**
 * @name        Shuffle Letters
 * @author        Martin Angelov
 * @version     1.0
 * @url            http://tutorialzine.com/2011/09/shuffle-letters-effect-jquery/
 * @license        MIT License
 */
(function(a){function b(a){var b="";if(a=="lowerLetter"){b="abcdefghijklmnopqrstuvwxyz0123456789"}else if(a=="upperLetter"){b="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"}else if(a=="symbol"){b=",.?/\\(^)![]{}*&^%$#'\""}var c=b.split("");return c[Math.floor(Math.random()*c.length)]}a.fn.shuffleLetters=function(c){var d=a.extend({step:8,fps:25,text:"",callback:function(){}},c);return this.each(function(){var c=a(this),e="";if(c.data("animated")){return true}c.data("animated",true);if(d.text){e=d.text.split("")}else{e=c.text().split("")}var f=[],g=[];for(var h=0;h<e.length;h++){var i=e[h];if(i==" "){f[h]="space";continue}else if(/[a-z]/.test(i)){f[h]="lowerLetter"}else if(/[A-Z]/.test(i)){f[h]="upperLetter"}else{f[h]="symbol"}g.push(h)}c.html("");(function j(a){var h,i=g.length,k=e.slice(0);if(a>i){c.data("animated",false);d.callback(c);return}for(h=Math.max(a,0);h<i;h++){if(h<a+d.step){k[g[h]]=b(f[g[h]])}else{k[g[h]]=""}}c.text(k.join(""));setTimeout(function(){j(a+1)},1e3/d.fps)})(-d.step)})}})(jQuery)


/*    .Customization    */

var playersTurn = false;
var newItem;

$(document).ready(function(){
    $('#header>h1').shuffleLetters();    
    var playGround= $('#playGround');


    $('tr.columnDetection td').hover(function(){
        if(playersTurn){
            $(this).addClass("hoveredA").animate({opacity:1.0});
        }else{
            $(this).addClass("hoveredB");
        }
    },function(){
        if(playersTurn){
            $(this).removeClass("hoveredA");
        }else{
            $(this).removeClass("hoveredB");
        }
    });
    $('tr.columnDetection td').on("click",function(){
        $(this).removeClass('hoveredA').removeClass('hoveredB').blur();
        addSymbol($(this));
        if(playersTurn){
            playersTurn=false;
        }else{
            playersTurn=true;
        }
    });

});

function addSymbol($aktRow){
    var rowIndex=$aktRow.attr('data-index');
    var $aktRow = $('td[data-index$="-'+rowIndex+'"]');    
    var firstItem = $aktRow.first();
    var $lastItem = $aktRow.last();
        
    if(firstItem.hasClass('hasDataA') || firstItem.hasClass('hasDataB')){
        alert("You can't add any further Items !");
    }else if(!$lastItem.hasClass('hasDataA' || !$lastItem.hasClass('hasDataB'))){
        if(playersTurn){                
            $lastItem.addClass('hasDataA');    
            newItem=$lastItem;                
        }else{    
            $lastItem.addClass('hasDataB');                    
            newItem=$lastItem;
        }            
    }else{
        checkForFreeItems($aktRow);        
    }
    checkIfMatch();
}

function checkForFreeItems(allItems){    
    var $revOrder =$(allItems).reverse();
    $revOrder.each(function(){
        if(!$(this).hasClass('hasDataA') && !$(this).hasClass('hasDataB')){
            if(playersTurn){                
                $(this).addClass('hasDataA');
                newItem=$(this);                
                return false;                    
            }else{    
                $(this).addClass('hasDataB');                    
                newItem=$(this);
                return false;
            }    
        }        
    });
    
}

function checkIfMatch(){
    var aktPosition= newItem.attr("data-index");
    var aktClass = newItem.attr('class');    
    console.debug(newItem.closest('td.'+aktClass));
}

function showWinnerMessage(){
   alert("Sucess we have a winner !");

}


/*    jQuery Reverse Plugin of Michael Stadler    (c) 2012*/
    $.fn.reverse = [].reverse;

/* doesExist PLUGIN (c) MS */
/* (c) Michael Stadler(MS), */
(function($){
    $.fn.doesExist = function()
    {
        return jQuery(this).length > 0;
    };
})(jQuery);


