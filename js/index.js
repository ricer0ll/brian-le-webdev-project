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
            addExperience(experience.image, experience.role, experience.date, experience.description, experience.alt)
        })
    });

}

function setProjectsSection(jsonFile) {
  fetch(jsonFile)
    .then((response) => response.json())
    .then((data) => {
        const listOfProjects = data.project;
        console.log(listOfProjects);

        listOfProjects.forEach((project) => {
            addProject(project.image, project.name, project.date, project.description, project.alt)
        })
    });

}

function addExperience(image, role, date, description, alt) {
  $("#experience")
  .append(
    $(`<div class="col-md-12 col-lg-5 d-flex justify-content-center my-5">`)
      .append(`<img src="assets/${image}" alt=${alt} class="rounded img-fluid"/>`)
  )
  .append(
    $(`<div class="col-lg-2">`)
  )
  .append(
    $(`<div class="col-md-12 col-lg-5 text-lg-start">`)
        .append($(`<h1>`).text(role))
        .append($(`<h5>`).text(date))
        .append($(`<p class="mt-3">`).text(description))
  );
}

function addProject(image, name, date, description, alt) {
  $("#projects")
  .append(
    $(`<div class="col-md-12 col-lg-5 d-flex justify-content-center my-5">`)
      .append(`<img src="assets/${image}" alt=${alt} class="rounded img-fluid"/>`)
  )
  .append(
    $(`<div class="col-lg-2">`)
  )
  .append(
    $(`<div class="col-md-12 col-lg-5 mt-5 text-lg-start">`)
        .append($(`<h1>`).text(name))
        .append($(`<h5>`).text(date))
        .append($(`<p>`).text(description))
  );
}

const jsonFile = "js/section_text.json";
setAboutSection(jsonFile);
setExperienceSection(jsonFile);
setProjectsSection(jsonFile);