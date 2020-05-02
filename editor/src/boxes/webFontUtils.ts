import { googleFonts } from "./fontProviders/google";
import { systemFonts } from "./fontProviders/system";
import { FontProvider, FontFamily } from "./types";





const pipe = <R>(...fns: Array<(a: R) => R>) =>
  fns.reduce((prevFn, nextFn) => value => nextFn(prevFn(value)));


const providers:{[k:string]: FontProvider} = {
    google: googleFonts,
    system: systemFonts
}

export const getFontProviderNames = () => Object.keys(providers);

export const getFontProvider = (name: string) => providers[name];





const paginate = (offset: number, limit: number) =>
    (list: FontFamily[]) =>
        list.filter((_, idx) => idx >= offset && idx < (offset + limit));

const filter = (q : string) => 
    (list: FontFamily[]) => 
        list.filter(i => i.name.toLowerCase().indexOf(q.toLowerCase()) !== -1);





export const findFonts = (q: string, offset: number, limit: number) => 
Promise.all(getFontProviderNames().map(provider => 
    getFontProvider(provider).getCatalog()
        .then(catalog => catalog.map(desc => desc.family))))
        .then(data => [].concat.apply([], data))
        .then(flattened => {
            const filtered = (q != "") ? filter(q)(flattened) : flattened;
            return {
                data: paginate(offset, limit)(filtered),
                total: filtered.length
            }
        });
            