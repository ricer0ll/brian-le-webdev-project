import {
  setAboutSection, 
  setExperienceSection, 
  setProjectsSection, isValidEmail
} from './utils.js';

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

  const toastLiveExample = document.getElementById("liveToast");

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

  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
  toastBootstrap.show();

  emailjs.send("service_roewke7", "template_ujdrkdg", templateParams).then(
    (response) => {
      console.log("Email sent");
    },
    (error) => {
      console.log("Failed to send email");
    },
  );
  console.log("Sent email");
});
