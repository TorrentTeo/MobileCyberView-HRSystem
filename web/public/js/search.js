
      $(document).ready(function(){  
           $('#search').keyup(function(){  
                search_table($(this).val());  
           });  
           function search_table(value){  
                $('#table_body tr').each(function(){  
                     var found = 'false';  
                     $(this).each(function(){  
                          if($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0)  
                          {  
                               found = 'true';  
                          }  
                     });  
                     if(found == 'true')  
                     {  
                          $(this).show();  
                     }  
                     else  
                     {  
                          $(this).hide();  
                     }  
                });  
           }  
      });  


      
      $(document).ready(function(){  
        $('#search2').keyup(function(){  
             search_table($(this).val());  
        });  
        function search_table(value){  
             $('#table_body2 tr').each(function(){  
                  var found = 'false';  
                  $(this).each(function(){  
                       if($(this).text().toLowerCase().indexOf(value.toLowerCase()) >= 0)  
                       {  
                            found = 'true';  
                       }  
                  });  
                  if(found == 'true')  
                  {  
                       $(this).show();  
                  }  
                  else  
                  {  
                       $(this).hide();  
                  }  
             });  
        }  
   });  
