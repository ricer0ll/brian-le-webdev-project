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

function addExperience(image, role, date, description) {
  $("#experience")
  .append(
    $(`<div class="col-md-12 col-lg-4 d-flex justify-content-center my-5">`)
      .append(`<img src="assets/${image}" alt="Apex Fintech Solutions logo" class="rounded img-fluid"/>`)
  )
  .append(
    $(`<div class="col-lg-3">`)
  )
  .append(
    $(`<div class="col-md-12 col-lg-5 mt-5 text-lg-start">`)
        .append($(`<h1>`).text(role))
        .append($(`<h5>`).text(date))
        .append($(`<p>`).text(description))
  );
}

function setExperienceSection(jsonFile) {
  fetch(jsonFile)
    .then((response) => response.json())
    .then((data) => {
        const listOfExperience = data.experience;
        console.log(listOfExperience);

        listOfExperience.forEach((experience) => {
            addExperience(experience.image, experience.role, experience.date, experience.description, )
        })
    });

}

const jsonFile = "js/section_text.json";
setAboutSection(jsonFile);
setExperienceSection(jsonFile);
