   function setSearch(inputEle, rowEle){
     $(inputEle).keyup(function(){  
          search_table(rowEle, $(this).val());  
     }); 
  } 
  
  function search_table(rowEle, value){  
      $(rowEle).each(function(){  
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
   setSearch('#search_home', '#table_body_home tr');
   setSearch('#search_p', '#table_body_p tr');
   setSearch('#search_pi', '#table_body_pi tr');
   setSearch('#search_atnd', '#table_body_atnd tr');
   setSearch('#search_benefit', '#table_body_benefit tr');
   setSearch('#search_cal_leave', '#table_body_cal_leave tr');
   setSearch('#search_cal_lr', '#table_body_cal_lr tr');
   setSearch('#search_cal_act', '#table_body_cal_act tr');
   setSearch('#search_contract', '#table_body_contract tr');
   setSearch('#search_parties', '#table_body_parties tr');






