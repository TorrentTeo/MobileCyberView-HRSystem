
(function ($) {
    "use strict";
    $('#addFeed').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('whatever') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)
        modal.find('.modal-title').text('New message to ' + recipient)
        modal.find('.modal-body input').val(recipient)
      })

      $('#attendanceCodeModel').on('show.bs.modal', async (event) =>  {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('whatever') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        const res = await getData('/attendanceCode');
        console.log(res)
        $("#attendanceCode").text(res.leaveRequests[0].code);
        var modal = $(this)
        modal.find('.modal-title').text('New message to ' + recipient)
        modal.find('.modal-body input').val(recipient)
      });
/*
      $('#getEmployeeModel').on('show.bs.modal', async (event) =>  {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('whatever') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        const res = await getData('/employees');
        console.log(res.employeeId)
        $("#employees").load(res.employeeId);
        var modal = $(this)
        modal.find('.modal-title').text('New message to ' + recipient)
        modal.find('.modal-body input').val(recipient)
      });



$(document).ready(function () {
    $('.clickable-row').on('click', function () {
        var userid = $(this).val('name');
        window.location = userid;
    });*/
$('.checkbox').click(function() {
    var userid  = $(this).closest("tr").find('td:eq(0)').text();
  
  });

$('.toggleColumns').on('change', function (e) {
    var tableColumn = $(e.currentTarget).data('target');
    $('.' + tableColumn).toggle();
  });

  $(".use-address").modal({
        keyboard: true,
        backdrop: "static",
        show:false,
    }).click(function() {
    var item = $(this).closest("tr")   // Finds the closest row <tr> 
                       .find("#nx1")     // Gets a descendent with id="nx"
                       .text();         // Retrieves the text within <td>
    $('#nr1').text(item);
    var item = $(this).closest("tr")
                       .find("#nx2")  
                       .text();    
    $('#nr2').text(item);
    var item = $(this).closest("tr")
                       .find("#nx3")
                       .text();
    $('#nr3').text(item);
    var item = $(this).closest("tr")
                       .find("#nx4")
                       .text();
    $('#nr4').text(item);
    var item = $(this).closest("tr")
                       .find("#nx5")
                       .text();
    $('#nr5').text(item);
    var item = $(this).closest("tr")
                       .find("#nx6")
                       .text();
    $('#nr6').text(item);
    var item = $(this).closest("tr")   // Finds the closest row <tr> 
                       .find("#nx7")     // Gets a descendent with id="nx"
                       .text();         // Retrieves the text within <td>
    $('#nr7').text(item);
    var item = $(this).closest("tr")
                       .find("#nx8")  
                       .text();    
    $('#nr8').text(item);
    var item = $(this).closest("tr")
                       .find("#nx9")
                       .text();
    $('#nr9').text(item);
    var item = $(this).closest("tr")
                       .find("#nx10")
                       .text();
    $('#nr10').text(item);
    var item = $(this).closest("tr")
                       .find("#nx11")
                       .text();
    $('#nr11').text(item);
    var item = $(this).closest("tr")
                       .find("#nx12")
                       .text();
    $('#nr12').text(item);
    var item = $(this).closest("tr")
                       .find("#nx13")
                       .text();
    $('#nr13').text(item);
});
$("#category").change(function() {
    var val = $(this).val();
    if(val === "Review") {
        $("#toSomeone").show();
    }
    else{
        $("#toSomeone").hide();
    }
  });
      async function test() {
        try {
          const res = await getData('https://api.icndb.com/jokes/random')
          console.log(res)
        } catch(err) {
          console.log(err);
        }
      }
      function getData(ajaxurl) { 
        return $.ajax({
          url: ajaxurl,
          type: 'GET',
        });
      };
      addEventListener('click', function (ev) {
        if (ev.target.classList.contains('whatever')) {
            ev.preventDefault();
            loadWithAjax(ev.target.href);
        }   
    });
    /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    $(document).ready(function(){
        $('[data-toggle="popover"]').popover();   
      });
    
})(jQuery);