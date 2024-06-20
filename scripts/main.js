        // Function to fetch and display courses
        async function fetchCourses() {
            try {
                const response = await fetch('http://localhost:8081/api/courses'); // Replace with actual API endpoint if needed
                const courses = await response.json();

                const tableBody = document.querySelector('#coursesTable tbody');
                tableBody.innerHTML = '';

                courses.forEach(course => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${course.dept}</td>
                        <td>${course.courseNum}</td>
                        <td>${course.courseName}</td>
                        <td><a href="details.html?courseid=${course.id}">See details</a></td>
                    `;
                    tableBody.appendChild(row);
                });
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        }

        // Fetch courses on page load
        document.addEventListener('DOMContentLoaded', fetchCourses);