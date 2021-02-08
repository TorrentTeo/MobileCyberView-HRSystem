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
   setSearch('#search_rewards', '#table_body_rewards tr');
   setSearch('#search_rewards_add', '#table_body_re_add tr');
   setSearch('#search_medplan', '#table_body_medplan tr');
   setSearch('#search_medrec', '#table_body_medrec tr');
   setSearch('#search_clist', '#table_body_clist tr');
   setSearch('#search_insurance', '#table_body_ins tr');
   setSearch('#search_mp_add', '#table_body_mpadd tr');
   setSearch('#search_clist_add', '#table_body_clistadd tr');
   setSearch('#search_ins_add', '#table_body_insadd tr');














