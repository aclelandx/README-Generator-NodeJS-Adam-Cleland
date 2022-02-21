const inquirer = require(`inquirer`);
const fs = require(`fs`);

inquirer
    .prompt([
        {
            type: `input`,
            message: `What is Your GitHub Username?\n`,
            name: `gitUsername`,
        },

        {
            type: `input`,
            message: `What is your Email Address?\n`,
            name: `emailAddress`,
        },

        {
            type: `input`,
            message: `What is the name of your Repo?\n`,
            name: `repoName`,
        },

        {
            type: `input`,
            message: `Please write a short Description about your application.\n`,
            name: `repoDesc`,
        },

        {
            type: `input`,
            message: `Please provide information pertaining to the installation of your project.\n`,
            name: `installation`,
            default: `Download the Repo and Run on your local machine`,
        },

        {
            type: `input`,
            message: `Please include any information about the usage of you application that you would like to include.\n`,
            name: `usage`,
        },

        {
            type: `input`,
            message: `Please add the Contribution Guidelines that you would like to include (Hit enter to use the Default).\n`,
            name: `contribution`,
            default: `Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.`,
        },

        {
            type: `input`,
            message: `What command should be used for tests to be conducted?\n`,
            name: `testCMD`,
            default: `npm test`,
        },

        {
            type: `input`,
            message: `What languages were utilized with this application? (Separate Each By a Comma)\n`,
            name: `languages`,
        },

        {
            type: `list`,
            name: `license`,
            message: `Select which license you would like to have added\n`,
            choices: [`MIT`, `Apache`, `Unlicense`],
            default: `MIT`,
        },

        {
            type: `input`,
            name: `owner`,
            message: `What name would you like the License to be under?\n`,
        }
    ])
    .then((userInput) => {
        let outputInfo =
            `
${licenseBadgePop(userInput.license)}
# ${userInput.repoName}
### Description
${userInput.repoDesc}

## Table of contents
---
- **Installation Instructions**
- **Usage Information**
- **Tests**
- **Languages Utilized**
- **Contributions**
- **Questions**
- **License**

## Installation
---
${userInput.installation}

## Usage Information
---
${userInput.usage}

## Tests
---
The command for running tests is :
\n
    ${userInput.testCMD}

## Languages Utilized
---
${mdList(userInput.languages, `,`)}

## Contributions
---
${userInput.contribution}

## Questions
---
### For Any Questions about the Application feel free to reach out to me on:
\nGithub:[${userInput.gitUsername}](https://github.com/${userInput.gitUsername})
\nEmail:<${userInput.emailAddress}>

## License
---
${licenseInformationPop(userInput.license, userInput.owner)}`;

        fs.writeFile(`README.md`, outputInfo, (err) =>
            err ? console.error(err) : console.log(`File has been created, Check your Local Files`)
        );
    });

// Splits the information in order to make a list and removes the comma from the array map for the print out.

function mdList(listItem, separator) {
    let splitter = listItem.split(separator);
    let listArray = [splitter].flat(2).map(self => `\n* ` + self.trim());
    let output = String(listArray).replace(/,/g, ``);
    return output;
};

// grabs the current year that this readme is being generated then takes the users selection and applies the corresponding license.
function licenseInformationPop(selection, CRName) {
    let grabDate = new Date();
    let year = grabDate.getFullYear();
    let selectedLicense;

    if (selection === `MIT`) {
        selectedLicense =
            `Copyright [${year}] [${CRName}]

        Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
        
        The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
        
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`;
        return selectedLicense;

    } else if (selection === `Apache`) {
        selectedLicense = `Copyright [${year}] [${CRName}]

        Licensed under the Apache License, Version 2.0 (the "License");
        you may not use this file except in compliance with the License.
        You may obtain a copy of the License at
        
            http://www.apache.org/licenses/LICENSE-2.0
        
        Unless required by applicable law or agreed to in writing, software
        distributed under the License is distributed on an "AS IS" BASIS,
        WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
        See the License for the specific language governing permissions and
        limitations under the License.`;
        return selectedLicense;
    } else if (selection === `Unlicense`) {
        selectedLicense =
            `This is free and unencumbered software released into the public domain.

        Anyone is free to copy, modify, publish, use, compile, sell, or
        distribute this software, either in source code form or as a compiled
        binary, for any purpose, commercial or non-commercial, and by any
        means.
        
        In jurisdictions that recognize copyright laws, the author or authors
        of this software dedicate any and all copyright interest in the
        software to the public domain. We make this dedication for the benefit
        of the public at large and to the detriment of our heirs and
        successors. We intend this dedication to be an overt act of
        relinquishment in perpetuity of all present and future rights to this
        software under copyright law.
        
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
        EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
        IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
        OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
        ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
        OTHER DEALINGS IN THE SOFTWARE.
        
        For more information, please refer to <http://unlicense.org/>`;
        return selectedLicense;
    }
    return selectedLicense;
};

// takes the selection from the options and applies the corresponding badge for the license
function licenseBadgePop(selection) {
    let badgeLink;
    if (selection === `MIT`) {
        badgeLink = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`
    } else if (selection === `Apache`) {
        badgeLink = `[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`
    } else if (selection === `Unlicense`) {
        badgeLink = `[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)`
    }
    return badgeLink;
};