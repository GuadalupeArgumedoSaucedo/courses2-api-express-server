window.onload = function() {
    const urlParams = new URLSearchParams(location.search);
    let id = -1;
    if (urlParams.has("courseid")) {
        id = urlParams.get("courseid");

        // Now that you know the course id, make an AJAX call to get that one course
        // and in the callback, display it.
        const url = `http://localhost:8081/api/courses/${id}`;
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch course details');
                }
                return response.json();
            })
            .then(course => {
                // Display course details
                document.getElementById('courseDetails').innerHTML = `
                    <h1>${escapeHtml(course.courseName)}</h1>
                    <p><strong>Department:</strong> ${escapeHtml(course.dept)}</p>
                    <p><strong>Course Number:</strong> ${escapeHtml(course.courseNum)}</p>
                    <p><strong>Instructor:</strong> ${escapeHtml(course.instructor)}</p>
                    <p><strong>Start Date:</strong> ${escapeHtml(course.startDate)}</p>
                    <p><strong>Duration:</strong> ${escapeHtml(course.numDays)} days</p>
                `;
            })
            .catch(error => {
                console.error('Error fetching course details:', error);
                document.getElementById('courseDetails').innerText = 'Failed to fetch course details.';
            });
    } else {
        document.getElementById('courseDetails').innerText = 'Course ID is missing in the query string.';
    }
};

function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}