let toggle = document.querySelector('.toggle');
let dropDownContent = document.querySelector('.dropdown-content')

toggle.addEventListener('click', function() {
	if(getComputedStyle(dropDown).display != "none"){
		dropDownContent.style.display = "none";
	  } else {
		dropDownContent.style.display = "block";
	  }
})