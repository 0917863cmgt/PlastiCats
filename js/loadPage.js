$('a').click(function(e) {
    e.preventDefault();
    newLocation = this.href;
    $('body').fadeOut('slow', newpage);
});
function newpage() {
    window.location = newLocation;
}

$(document).ready(function(){

    /*! Fade effect als de pagina laad */
    $('body').css('display', 'none');
    $('body').fadeIn(500);

});


function Reload() {
    try {
        var headElement = document.getElementsByTagName("head")[0];
        if (headElement && headElement.innerHTML)
            headElement.innerHTML += "<meta http-equiv=\"refresh\" content=\"1\">";
    }
    catch (e) {}
}
