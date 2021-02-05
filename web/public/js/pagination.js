$(document).ready(function(){
    $('#pagination').after('<div id="nav"></div>');
    var rowsShown = 4;
    var rowsTotal = $('#pagination tbody tr').length;
    var numPages = rowsTotal/rowsShown;
    for(i = 0;i < numPages;i++) {
        var pageNum = i + 1;
        $('#nav').append('<button type="button" rel="'+i+'" class="navpage">'+pageNum+'</button> ');
    }
    $('#pagination tbody tr').hide();
    $('#pagination tbody tr').slice(0, rowsShown).show();
    $('#nav button:first').addClass('active');
    $('#nav button').bind('click', function(){

        $('#nav button').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $('#pagination tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
        css('display','table-row').animate({opacity:1}, 300);
    });
});

$(document).ready(function(){
    $('#pagination2').after('<div id="nav2"></div>');
    var rowsShown = 4;
    var rowsTotal = $('#pagination2 tbody tr').length;
    var numPages = rowsTotal/rowsShown;
    for(i = 0;i < numPages;i++) {
        var pageNum = i + 1;
        $('#nav2').append('<button type="button" rel="'+i+'" class="navpage">'+pageNum+'</button> ');
    }
    $('#pagination2 tbody tr').hide();
    $('#pagination2 tbody tr').slice(0, rowsShown).show();
    $('#nav2 button:first').addClass('active');
    $('#nav2 button').bind('click', function(){

        $('#nav2 button').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $('#pagination2 tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
        css('display','table-row').animate({opacity:1}, 300);
    });
});