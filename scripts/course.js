const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    completed: false
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    completed: true
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    completed: false
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    completed: false
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    completed: true
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    completed: false
  }
];

const courseContainer = document.querySelector("#course-container");
const creditTotal = document.querySelector("#credit-total");

const allCoursesButton = document.querySelector("#all-courses");
const wddCoursesButton = document.querySelector("#wdd-courses");
const cseCoursesButton = document.querySelector("#cse-courses");

function displayCourses(courseList) {
  courseContainer.innerHTML = "";

  courseList.forEach((course) => {
    const courseCard = document.createElement("div");

    courseCard.classList.add("course-card");

    if (course.completed) {
      courseCard.classList.add("completed");
    }

    courseCard.textContent = `${course.subject} ${course.number}`;

    courseContainer.appendChild(courseCard);
  });

  displayCredits(courseList);
}

function displayCredits(courseList) {
  const totalCredits = courseList.reduce((sum, course) => sum + course.credits, 0);

  creditTotal.textContent =
    `The total credits for courses listed below is ${totalCredits}`;
}

function setActiveButton(activeButton) {
  const buttons = [allCoursesButton, wddCoursesButton, cseCoursesButton];

  buttons.forEach((button) => {
    button.classList.remove("active-filter");
  });

  activeButton.classList.add("active-filter");
}

allCoursesButton.addEventListener("click", () => {
  displayCourses(courses);
  setActiveButton(allCoursesButton);
});

wddCoursesButton.addEventListener("click", () => {
  const wddCourses = courses.filter((course) => course.subject === "WDD");

  displayCourses(wddCourses);

  setActiveButton(wddCoursesButton);
});

cseCoursesButton.addEventListener("click", () => {
  const cseCourses = courses.filter((course) => course.subject === "CSE");

  displayCourses(cseCourses);

  setActiveButton(cseCoursesButton);
});

displayCourses(courses);