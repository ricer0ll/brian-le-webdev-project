import {
  setAboutSection,
  setExperienceSection,
  setProjectsSection,
  isValidEmail,
} from "./utils.js";

let submissionLocked = false;

// EmailJS docs: https://www.emailjs.com/docs/tutorial/overview/
emailjs.init({
  publicKey: "YTMD_35H_10BWvLt4",
  blockHeadless: true,
  blockList: {
    list: [],
  },
  // the limitRate does not work btw...
  limitRate: {
    id: "app",
    throttle: 10000,
  },
});

const jsonFile = "js/section_text.json";
setAboutSection(jsonFile);
setExperienceSection(jsonFile);
setProjectsSection(jsonFile);

// EmailJS stuff
const emailSubmit = document.querySelector("#contactForm");
emailSubmit.addEventListener("submit", (event) => {
  event.preventDefault();

  const emailSuccessToast = document.getElementById("emailSuccessToast");
  const emailWaitToast = document.getElementById("emailWaitToast");

  // prevents spams
  const waitToast = bootstrap.Toast.getOrCreateInstance(emailWaitToast);
  if (submissionLocked) {
    waitToast.show();
    return;
  }

  const templateParams = {
    name: document.querySelector("#inputName").value,
    message: document.querySelector("#inputMsg").value,
    email: document.querySelector("#inputEmail").value,
  };

  // Make sure the email is valid
  if (!isValidEmail(templateParams.email)) {
    const myModal = new bootstrap.Modal(document.getElementById("myModal"));
    myModal.show();
    return;
  }

  // start cooldown
  submissionLocked = true;

  // send email
  const successToast = bootstrap.Toast.getOrCreateInstance(emailSuccessToast);
  emailjs.send("service_roewke7", "template_ujdrkdg", templateParams).then(
    (response) => {
      console.log("Email sent");
      // emailjs rate limiting does not work...
      setTimeout(() => {
        submissionLocked = false;
      }, 10000);
      successToast.show();
    },
    (error) => {
      console.log("Failed to send email");
    },
  );
});
