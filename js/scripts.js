var studentListArray = [].slice.call(document.querySelectorAll(".student-item"));
var studentNumberByPage = 10;

function hideStudents(numberTohide, event){
    var slicedArray;
    slicedArray = studentListArray.slice(numberTohide, studentListArray.length);
    for(var i = 0; i < slicedArray.length; i += 1) {
        slicedArray[i].style.display = "none";
    }
}

window.addEventListener("load", function(event){
    hideStudents(studentNumberByPage, event);
});