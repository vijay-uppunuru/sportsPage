

var $buttons = $('.buttons').find('button');
var currentSort = 'sort-all';
var animating = false;


$.getJSON('./data.json')
.done(function (data) {
var products= data;
console.log(products);




var compiled = _.template(
  "<div class='box sort-<%= category %> thumbnail'>" + 
   "<div class='details'>" +
      "<div class='title'><%= title %></div>" + 
      "<div class='price'><%= price %></div>" + 
    "</div>" + 
    "<img src='<%= img %>' />" + 
  "</div>"
);

var i, toAppendString = "";

for (i = 0; i < products.length; i++) {
  toAppendString += compiled(products[i]);
}  

$(".boxes").append(toAppendString);

var $boxes = $('.boxes').find('.box');

$buttons.each(function(index){
  
  $(this).on('click', function(){
    $buttons.removeClass('active');
    if($(this).attr('data-sort') !== currentSort && !animating) {
      $(this).addClass('active');      
      currentSort = $(this).attr('data-sort');
      sortBoxes(currentSort);
    }
    
  });
  
});



function sortBoxes(sort) {
  if( sort === 'sort-all' ) {
    $boxes.filter(':visible').fadeOut(function(){
      shownext($(".box"));
    });   
  } else {
    $boxes.filter(':visible').fadeOut(function(){
      shownext($("."+sort));
    });    
  }
}

function hidenext(jq){
    jq.eq(0).fadeOut(50, function(){
        (jq=jq.slice(1)).length && hidenext(jq);
    });
    if(jq.length > 1) {
      animating = true;
    } else {
      animating = false;
    }
}

function shownext(jq){
    jq.eq(0).fadeIn(50, function(){
        (jq=jq.slice(1)).length && shownext(jq);
    });
    if(jq.length > 1) {
      animating = true;
    } else {
      animating = false;
    }
}

});


