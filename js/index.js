function setAboutSection(jsonFile) {
  const aboutTitle = document.querySelector("#aboutTitle");
  const aboutText = document.querySelector("#aboutText");
  const educationText = document.querySelector("#educationText");

  fetch(jsonFile)
    .then((response) => response.json())
    .then((data) => {
      aboutTitle.textContent = data.about.title;
      aboutText.textContent = data.about.description;
      educationText.textContent = data.education.description;
    });
}

function setExperienceSection(jsonFile) {
  fetch(jsonFile)
    .then((response) => response.json())
    .then((data) => {
      const listOfExperience = data.experience;

      listOfExperience.forEach((experience) => {
        addExperience(
          experience.image,
          experience.role,
          experience.date,
          experience.description,
          experience.alt,
          experience.link,
        );
      });
    });
}

function setProjectsSection(jsonFile) {
  fetch(jsonFile)
    .then((response) => response.json())
    .then((data) => {
      const listOfProjects = data.project;

      listOfProjects.forEach((project) => {
        addProject(
          project.image,
          project.name,
          project.date,
          project.description,
          project.alt,
          project.link,
        );
      });
    });
}

function addExperience(image, role, date, description, alt, link) {
  $("#experience")
    .append(
      $(
        `<div class="col-md-12 col-lg-4 d-flex justify-content-center my-5">`,
      ).append(
        $(`<a href=${link} target="_blank">`).append(
          $(
            `<img id="experienceBanner" src="assets/${image}" alt=${alt} class="rounded img-fluid"/>`,
          ),
        ),
      ),
    )
    .append($(`<div class="col-lg-3">`))
    .append(
      $(`<div class="col-md-12 col-lg-5 text-lg-start">`)
        .append($(`<h1>`).text(role))
        .append($(`<h5>`).text(date))
        .append($(`<p class="mt-3">`).text(description)),
    );
}

function addProject(image, name, date, description, alt, link) {
  $("#projects")
    .append(
      $(
        `<div class="col-md-12 col-lg-5 d-flex justify-content-center my-5">`,
      ).append(
        $(`<a href=${link} target="_blank">`).append(
          $(
            `<img id="projectBanner" src="assets/${image}" alt=${alt} class="rounded img-fluid"/>`,
          ),
        ),
      ),
    )
    .append($(`<div class="col-lg-2">`))
    .append(
      $(`<div class="col-md-12 col-lg-5 mt-5 text-lg-start">`)
        .append($(`<h1>`).text(name))
        .append($(`<h5>`).text(date))
        .append($(`<p>`).text(description)),
    );
}

function isValidEmail(email) {
  // Credit: https://www.geeksforgeeks.org/javascript/javascript-program-to-validate-an-email-address/

  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// EmailJS docs: https://www.emailjs.com/docs/tutorial/overview/
emailjs.init({
  publicKey: "YTMD_35H_10BWvLt4",
  blockHeadless: true,
  blockList: {
    list: [],
  },
  limitRate: {
    // Set the limit rate for the application
    id: "app",
    // Allow 1 request per 10s
    throttle: 10000,
  },
});


const jsonFile = "js/section_text.json";
setAboutSection(jsonFile);
setExperienceSection(jsonFile);
setProjectsSection(jsonFile);

const emailSubmit = document.querySelector("#contactForm");
emailSubmit.addEventListener("submit", (event) => {
  event.preventDefault();

  const toastLiveExample = document.getElementById('liveToast')

  const templateParams = {
    name: document.querySelector("#inputName").value,
    message: document.querySelector("#inputMsg").value,
    email: document.querySelector("#inputEmail").value,
  };

  // Make sure the email is valid
  if (!isValidEmail(templateParams.email)) {
    const myModal = new bootstrap.Modal(document.getElementById('myModal'));
    myModal.show();
    return;
  }

  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastBootstrap.show()

  //emailjs.send("service_roewke7", "template_ujdrkdg", templateParams);
  console.log("Sent email");
});
