document.addEventListener("DOMContentLoaded", function() {
    var year = new Date().getFullYear();
    var copyrightText = "&copy; " + year + " Sua Empresa. Todos os direitos reservados.";
    document.getElementById("copyright").innerHTML = copyrightText;
});
