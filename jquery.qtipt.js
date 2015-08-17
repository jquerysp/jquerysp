function PreSaveAction(){
    var itemTitle = $("textarea[title$='Comments if not Recordable']").val();
    if (itemTitle.length < 1) {
            alert("Please enter Comments if not Recordable before saving it again.");
            return false;
    }
};

$(document).ready(function(){

$("textarea[title$='Comments if not Recordable']").qtip({ 
    content: {
        text: 'Tick the checkbox when you fill out all the necessary fields above. After ticking off, you can submit this incident report by clicking the save botton at the top left or the bottom right hand side of the page.'
    },
    position: {
        adjust: {
            x: 215
        }
    }
});



});
