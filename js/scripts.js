var studentListArray = [].slice.call(document.querySelectorAll('.student-item')),
    totalStudentInList = studentListArray.length,
    totalStudentByPage = 10,
    totalPaginationLinks = Math.floor(totalStudentInList / totalStudentByPage);
    paginationHtml = '';
    paginationSection =  document.getElementById('paginationOutputSection');

// Function to hide students
function hideStudents(totalToHide, event) {
    var slicedArray;
    slicedArray = studentListArray.slice(totalToHide, totalStudentInList);
    for(var i = 0; i < slicedArray.length; i += 1) {
        slicedArray[i].style.display = 'none';
    }
}

// Function to create pagination links
function createPaginationLinks (numberOfPages, event) {
    paginationHtml += '<div class="pagination"><ul>';
        for (var i = 1; i <= numberOfPages; i += 1) {
            paginationHtml += '<li><a href="#">'+i+'</a>';
        }
    paginationHtml += '</div></ul>';
    paginationSection.innerHTML = paginationHtml;
}

// Event listener to dynamically hide students & create pagination links
window.addEventListener("load", function(event){
    hideStudents(totalStudentByPage, event);
    createPaginationLinks(totalPaginationLinks);
});