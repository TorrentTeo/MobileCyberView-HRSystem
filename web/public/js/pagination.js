function setPage(pagination, pageBody, buttonDiv){
    $(pagination).after('<div id="' + buttonDiv + '"> </div>');
    var rowsShown = 4;
    var rowsTotal = $(pageBody).length;
    var numPages = rowsTotal/rowsShown;
    for(i = 0;i < numPages;i++) {
        var pageNum = i + 1;
        $(buttonDiv).append('<button type="button" rel="'+i+'" class="navpage">'+pageNum+'</button> ');
    }
    $(pageBody).hide();
    $(pageBody).slice(0, rowsShown).show();
    $(buttonDiv +  ' button:first ').addClass('active');
    $(buttonDiv + ' button ').bind('click', function(){

        $(buttonDiv + ' button ').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $(pageBody).css('opacity','0.0').hide().slice(startItem, endItem).
        css('display','table-row').animate({opacity:1}, 300);
    });
}

setPage('#page-home', '#page-home tbody tr', '#nav_home')
setPage('#page-benefit', '#page-benefit tbody tr', '#nav_benefit')
setPage('#page-cal-leave', '#page-cal-leave tbody tr', '#nav_leave')
setPage('#page-cal-lr', '#page-cal-lr tbody tr', '#nav_lr')
setPage('#page-cal-act', '#page-cal-act tbody tr', '#nav_act')
setPage('#page-medplan', '#page-medplan tbody tr', '#nav_mp')
setPage('#page-medrec', '#page-medrec tbody tr', '#nav_mr')
setPage('#page-clist', '#page-clist tbody tr', '#nav_clist')
setPage('#page-insurance', '#page-insurance tbody tr', '#nav_ins')
setPage('#page-contract', '#page-contract tbody tr', '#nav_con')
setPage('#page-parties', '#page-parties tbody tr', '#nav_part')
setPage('#page-rewards', '#page-rewards tbody tr', '#nav_re')

setPage('#page-p', '#page-p tbody tr', '#nav_p')
setPage('#page-pi', '#page-pi tbody tr', '#nav_pi')
