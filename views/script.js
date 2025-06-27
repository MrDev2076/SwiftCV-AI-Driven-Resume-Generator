document.addEventListener("DOMContentLoaded", function () {
    const profilePicInput = document.getElementById("profile-pic-input");
    const profilePicPreview = document.getElementById("profile-pic-preview");
    const form = document.getElementById("resume-form");
    const resumeContainer = document.getElementById("resume-container");
    const printButton = document.getElementById("print-button");

    // Function to initialize CKEditor for textareas
    async function TextEditor(element) {
        return ClassicEditor.create(element, {
            toolbar: ['heading', 'bold', 'italic', 'bulletedList', 'numberedList', 'blockQuote']
        });
    }

    // Initialize CKEditor for specific fields
    let Experience, Education, Projects, Skills, Certifications;

    TextEditor(document.querySelector('[name="experience"]')).then(editor => { Experience = editor; });
    TextEditor(document.querySelector('[name="education"]')).then(editor => { Education = editor; });
    TextEditor(document.querySelector('[name="projects"]')).then(editor => { Projects = editor; });
    TextEditor(document.querySelector('[name="skills"]')).then(editor => { Skills = editor; });
    TextEditor(document.querySelector('[name="certifications"]')).then(editor => { Certifications = editor; });

    // Handle Profile Picture Upload
    profilePicInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profilePicPreview.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle Form Submission & Prevent Page Reload
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission behavior

        const formData = new FormData(form);

        document.getElementById("display-name").textContent = formData.get("name");
        document.getElementById("display-job-title").textContent = formData.get("job-title");
        document.getElementById("display-location").textContent = "📍 " + formData.get("location");
        document.getElementById("display-email").textContent = "📧 " + formData.get("email");
        document.getElementById("display-linkedin").textContent = "🔗 " + formData.get("linkedin");
        document.getElementById("display-phone").textContent = "📞 " + formData.get("phone");

        document.getElementById("display-summary").innerHTML = formData.get("summary");
        document.getElementById("display-experience").innerHTML = Experience.getData();
        document.getElementById("display-education").innerHTML = Education.getData();
        document.getElementById("display-projects").innerHTML = Projects.getData();
        document.getElementById("display-skills").innerHTML = Skills.getData();
        document.getElementById("display-certifications").innerHTML = Certifications.getData();

        // Show resume section
        resumeContainer.style.display = "block";

        // Smooth scroll to resume preview
        resumeContainer.scrollIntoView({ behavior: "smooth" });
    });

    printButton.addEventListener("click", function () {
        window.print();
    });
});
