import { FontProvider, WebFontDesc, WebFontVariant, WebFontWeight } from "../types";
import { GOOGLE_FONT_API_URL, GOOGLE_FONT_API_KEY } from "../constants";
import WebFont = require("webfontloader");

//type GoogleFontListSortBy = "alpha" | "date" | "popularity" | "style" | "trending";

type GoogleWebFontDesc = {
    family: string
    variants: string[]
    subsets: string[]
    version: string
    lastModified: string
    files: { [k:string]: string }
}

type GoogleResponse = {
    items: GoogleWebFontDesc[]
}

const toGoogleVariant = ({ weight, italic }: WebFontVariant) => {
        if (weight === 400) {
            return italic ? "italic" : "regular";
        }

        return `${weight}${italic ? "italic" : ""}`
}
    
const parseGoogleVariant = (s: string):WebFontVariant => {
    const n = parseInt(s);
    if (isNaN(n)) {
        return {
            weight: 400,
            italic: s == "italic"
        }
    }

    return {
        weight: n as WebFontWeight,
        italic: s.substr(3) == "italic"
    }
}

const cache = <T>(dataSource: () => Promise<T>) => {
    let data:T;
    return () => {
        if (data) return Promise.resolve(data);
        return dataSource().then(rs => { 
            data = rs;
            return rs;
        });
    }
}

const loadFromGoogle = () => fetch(`${GOOGLE_FONT_API_URL}?key=${GOOGLE_FONT_API_KEY}&sort=alpha`)
    .then(rs => rs.json())
    .then((json: GoogleResponse) => json.items.map((i) => ({
        family: { name: i.family, provider: "google" },
        variants: i.variants.map(parseGoogleVariant)
    })))

const log = <T>(dataSource: () => Promise<T>) => 
    () => dataSource()
        .then(rs => { 
            console.log(rs);
            return rs; 
        });

export const googleFonts:FontProvider = {

    download: (fonts, text) => 
        new Promise((resolve, reject) => {
            WebFont.load({
                google: {
                    families: fonts.map(({ family, variants }) => `${family.name}:${variants.map(toGoogleVariant).join(',')}`), 
                    text
                },
                fontloading: (familyName, _) => {
                    resolve({})
                },
                fontinactive: (familyName, _) => {
                    console.warn("web font error for family: " + familyName);
                    reject({})
                }
            });
    }),

    getCatalog: cache(loadFromGoogle)
}