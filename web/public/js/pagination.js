$(document).ready(function(){
    $('#pagination').after('<div id="nav"></div>');
    var rowsShown = 4;
    var rowsTotal = $('#pagination tbody tr').length;
    var numPages = rowsTotal/rowsShown;
    for(i = 0;i < numPages;i++) {
        var pageNum = i + 1;
        $('#nav').append('<a href="#" rel="'+i+'" class="navpage">'+pageNum+'</a> ');
    }
    $('#pagination tbody tr').hide();
    $('#pagination tbody tr').slice(0, rowsShown).show();
    $('#nav a:first').addClass('active');
    $('#nav a').bind('click', function(){

        $('#nav a').removeClass('active');
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
        $('#nav2').append('<a href="#" rel="'+i+'" class="navpage">'+pageNum+'</a> ');
    }
    $('#pagination2 tbody tr').hide();
    $('#pagination2 tbody tr').slice(0, rowsShown).show();
    $('#nav2 a:first').addClass('active');
    $('#nav2 a').bind('click', function(){

        $('#nav2 a').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $('#pagination2 tbody tr').css('opacity','0.0').hide().slice(startItem, endItem).
        css('display','table-row').animate({opacity:1}, 300);
    });
});