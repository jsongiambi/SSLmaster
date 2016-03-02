$(function() {
    
    function DOM(data) {
        var select = $('pre');
        if (select) {
            select.remove();
        } else {
            
        }
        var newElem = $('<pre>');
        newElem.attr('style', 'word-wrap: break-word; white-space: pre-wrap; margin-top: 20px;');
        newElem.text(data);
        $('body').append(newElem);
    }
    
    $('#list1').on('click', function () {
        if ($('#list2').attr('class')) {
            $('#list2').removeAttr('class');
        }
        if (!$(this).attr('class')) {
            $(this).attr('class', 'active');
        }
        if ($('#btn1').attr('disabled')) {
            $('#btn1').removeAttr('disabled');
        }
    });
    
    $('#list2').on('click', function (e) {
        e.preventDefault();
        // if ($('#list1').attr('class')) {
        //     $('#list1').removeAttr('class');
        // }
        // if (!$(this).attr('class')) {
        //     $(this).attr('class', 'active');
        // }
    });
    
    $('#btn1').on('click', function() {
        console.log('it works');
        var ptype,
            text;
        if ($('#list1').attr('class') === 'active') {
            ptype = "page";
        } else if ($('#list2').attr('class') === 'active') {
            ptype = "id";
        }
        text = $('.formval').val();
        $.ajax({
            type: "POST",
            url: '/process',
            // The key needs to match your method's input parameter (case-sensitive).
            data: JSON.stringify({ "type": ptype, "input": text }),
            contentType: "application/json",
            dataType: "text",
            success: function (data) {
                DOM(data);
            },
            failure: function(errMsg) {
                alert(errMsg);
            }
        });
        $('.formval').val('');
        $('#btn1').attr('disabled', 'disabled');
    });
});