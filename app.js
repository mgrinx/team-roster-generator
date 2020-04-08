const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const getTeamMembers = async () => {
    try {
        const teamMembers = [];
        const amount = await inquirer.prompt([
            {
                type : "number",
                name : "val",
                message : "How many team members are there?"
            }
        ]);
        for (let i = 0; i < amount.val; i++) {
            const info = await inquirer.prompt([
                {
                    type : "input",
                    name : "name",
                    message : `Enter name for employee #${i + 1}:`
                },
                {
                    type : "number",
                    name : "id",
                    message : "Enter employee ID:"
                },
                {
                    type : "input",
                    name : "email",
                    message : "Enter employee email:"
                },
                {
                    type : "list",
                    name : "type",
                    message : "What type of employee are they?",
                    choices : [
                        "Manager",
                        "Engineer",
                        "Intern"
                    ]
                }
            ]);
            switch (info.type) {
                case "Manager":
                    const officeNumber = await inquirer.prompt([
                        {
                            type : "number",
                            name : "val",
                            message : "What is their office number?"
                        }
                    ]);
                    teamMembers.push(new Manager(info.name, info.id, info.email, officeNumber.val));
                    break;
                case "Engineer":
                    const github = await inquirer.prompt([
                        {
                            type : "input",
                            name : "val",
                            message : "What is their github profile?"
                        }
                    ]);
                    teamMembers.push(new Engineer(info.name, info.id, info.email, github.val));
                    break;
                case "Intern":
                    const school = await inquirer.prompt([
                        {
                            type : "input",
                            name : "val",
                            message : "What is the name of their school?"
                        }
                    ]);
                    teamMembers.push(new In(info.name, info.id, info.email, school.val));
                    break;
                default:
                    break;
            }
        }
        return teamMembers;
    } catch (err) {
        console.error(err);
    }
}

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

getTeamMembers()
    .then(res => fs.writeFileSync(outputPath, render(res)))
    .then(() => console.log("Output saved to " + outputPath));

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```