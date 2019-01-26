var MEDIA_URL;

var quotesCount;
var currentQuoteId;

var smallMap = '<iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://maps.google.com/maps/ms?ie=UTF8&amp;msa=0&amp;msid=111189334222987050241.00048b68037707b5c8c0a&amp;ll=48.455022,35.057545&amp;spn=0.013662,0.027466&amp;z=15&amp;output=embed"></iframe>';
var bigMap = '<iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="http://maps.google.com/maps/ms?ie=UTF8&amp;msa=0&amp;msid=111189334222987050241.00048b68037707b5c8c0a&amp;ll=48.455022,35.057545&amp;spn=0.013662,0.027466&amp;z=16&amp;output=embed"></iframe>'


function __init__(mu){
    MEDIA_URL = mu;
    
    activeMenuItem();

    if ( $.browser.msie ) {
        $('#wrapper').corner('20px');
    }
    
    // enable slide blocks
    
    $('#content h2').click(function(){
        slideNext(this);
    });
    
    $('.slidenext').click(function(){
        slideNext(this);
    });

    $('#content h2').each(function(){
        var html = $(this).html();
        $(this).html('&#9656;&nbsp;'+html);
    });
    
    $('.slidenext').each(function(){
        var html = $(this).html();
        $(this).html('&#9656;&nbsp;'+html);
    });

    $('#map').html(smallMap);
    
    $('#bigmap').click(function(){
        var $map = $('#map');
        if ($(this).hasClass('bigmap')){
            $map.width(400);
            $map.height(300);
            $map.empty();
            $map.html(smallMap);
            $(this).html('<small>(увеличить карту)</small>').removeClass('bigmap');
        } else {
            $map.width(880);
            $map.height(500);
            $map.empty();
            $map.html(bigMap);
            $(this).html('<small>(уменьшить карту)</small>').addClass('bigmap');
        }
    });
    
    quotesCount = $('#quotes li').length;
    //currentQuoteId = -1;
    currentQuoteId = Math.floor(Math.random()*quotesCount)-1;
    
    nextQuote();
    setInterval(nextQuote, 7000);
    
    setTimeout('fixDebates()', 4000);
    
}

function slideNext(el){
    var $block = $(el).next();
    if (0 == $block.length) {
        $block = $(el).parent().next();
    }
    if ($block.hasClass('slide')){
        $block.slideToggle();
        
        // toggle marker
        var html = $(el).html();
        if (html.indexOf('▸') == 0){
            $(el).html(html.replace('▸', '▾'));
        } else if (html.indexOf('▾') == 0){
            $(el).html(html.replace('▾', '▸'));
        }
    }
}

function activeMenuItem(){
    var path = window.location.pathname;
    $('#menu li a').each(function(i){
        if ($(this).attr('href') == path){
            $(this).parent().addClass('active');
            var klass = path.replace(/\//g, '');
            $('#content').addClass(klass);
            
            if ( $.browser.msie ) {
                $(this).corner('9px');
            }
        }
    });
}

function nextQuote(){
    // hide current quote
    if (currentQuoteId >= 0 && currentQuoteId < quotesCount){
        $($('#quotes li')[currentQuoteId]).fadeOut(600, function(){
            showQuote();
        });
    } else {
        showQuote();
    }
    
}

function showQuote(){
    // inc quote id
    currentQuoteId++;
    if (currentQuoteId >= quotesCount){
        currentQuoteId = 0;
    }
    
    // show new quote
    $($('#quotes li')[currentQuoteId]).fadeIn(600);
}

function fixDebates(){
    $('#IDCommentsHead').hide();
    $('#IDCommentsNewThreadCover h3').text('Задать вопрос');
    $('#IDNewThreadSubmitLI strong').text('Оставить вопрос');
    $('#IDCNavGuest2 span').text('Задать вопрос как Гость или войти:');
}
