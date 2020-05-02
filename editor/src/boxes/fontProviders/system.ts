import { FontProvider, WebFontVariant } from "../types";

const families = [
    "Georgia", 
    "Times New Roman", 
    "Arial", 
    "Arial Black", 
    "Comic Sans MS",
    "Impact",
    "Lucida Sans Unicode",
    "Tahoma",
    "Trebuchet MS",
    "Verdana",
    "Courier New",
    "Lucida Console"
] 

export const variants:WebFontVariant[] = [
    { weight: 100, italic: false },
    { weight: 100, italic: true },
    { weight: 200, italic: false },
    { weight: 200, italic: true },
    { weight: 300, italic: false },
    { weight: 300, italic: true },
    { weight: 400, italic: false },
    { weight: 400, italic: true },
    { weight: 500, italic: false },
    { weight: 500, italic: true },
    { weight: 600, italic: false },
    { weight: 600, italic: true },
    { weight: 700, italic: false },
    { weight: 700, italic: true },
    { weight: 800, italic: false },
    { weight: 800, italic: true },
    { weight: 900, italic: false },
    { weight: 900, italic: true },
]

export const systemFonts:FontProvider = {

    download: (fonts, text) => 
        new Promise((resolve, reject) => { resolve({}) }),

    getCatalog: () => 
        new Promise((resolve, reject) => {
            resolve(families.map(familyName => ({ family: { name: familyName, provider: "system" }, variants })));
        })
} 
