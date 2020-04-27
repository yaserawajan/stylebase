export const humanizeIdentifier = (str:string) =>
    str
        // insert a space before all caps
        .replace(/([A-Z])/g, ' $1')
        // uppercase the first character
        .replace(/^./, function(s){ return s.toUpperCase(); })
        .toLowerCase();