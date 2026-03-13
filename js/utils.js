export function setAboutSection(jsonFile) {
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

export function setExperienceSection(jsonFile) {
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

export function setProjectsSection(jsonFile) {
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

export function addExperience(image, role, date, description, alt, link) {
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

export function addProject(image, name, date, description, alt, link) {
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
      $(`<div class="col-md-12 col-lg-5 mt-2 text-lg-start">`)
        .append($(`<h1>`).text(name))
        .append($(`<h5>`).text(date))
        .append($(`<p>`).text(description)),
    );
}

export function isValidEmail(email) {
  // Credit: https://www.geeksforgeeks.org/javascript/javascript-program-to-validate-an-email-address/

  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}