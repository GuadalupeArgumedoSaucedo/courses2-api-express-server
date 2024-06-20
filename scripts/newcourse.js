document.addEventListener('DOMContentLoaded', function() {
    const newCourseForm = document.getElementById('newCourseForm');

    newCourseForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission
        
        // Get form data
        const formData = {
            dept: document.getElementById('dept').value,
            courseNum: document.getElementById('courseNum').value,
            courseName: document.getElementById('courseName').value,
            instructor: document.getElementById('instructor').value,
            startDate: document.getElementById('startDate').value,
            numDays: document.getElementById('numDays').value
        };

        // Validate form data
        for (const key in formData) {
            if (!formData[key]) {
                alert('Please fill in all fields.');
                return;
            }
        }

        // POST request to API
        fetch('http://localhost:8081/api/courses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to add new course');
            }
            return response.json();
        })
        .then(() => {
            alert('New course added successfully.');
            window.location.href = 'index.html'; // Redirect to list all courses page
        })
        .catch(error => {
            console.error('Error adding new course:', error);
            alert('Failed to add new course.');
        });
    });
});

