var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('confirm-btn').addEventListener('click', function() {
    document.getElementById('extra-content1').style.display = 'block';
});
  document.getElementById('confirm-btn').addEventListener('click', function() {
    document.getElementById('extra-content2').style.display = 'block';
});
document.getElementById('confirm-btn').addEventListener('click', function() {
  document.getElementById('extra-content3').style.display = 'block';
});
});
  
  document.getElementById('cancel-btn').addEventListener('click', function() {
    document.getElementById('extra-content').style.display = 'none';
  });
  
