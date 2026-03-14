const url = "data/members.json";
const membersContainer = document.querySelector("#members");

async function getMembers() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data);
}

const displayMembers = (members) => {
    members.forEach((member) => {

        const card = document.createElement("section");
        const name = document.createElement("h2");
        const address = document.createElement("p");
        const phone = document.createElement("p");
        const website = document.createElement("a");
        const image = document.createElement("img");

        name.textContent = member.name;
        address.textContent = member.address;
        phone.textContent = member.phone;

        website.textContent = "Visit Website";
        website.href = member.website;
        website.target = "_blank";

        image.setAttribute("src", `images/${member.image}`);
        image.setAttribute("alt", `${member.name} logo`);
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", "200");

        card.appendChild(name);
        card.appendChild(image);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        membersContainer.appendChild(card);
    });
};

getMembers();
