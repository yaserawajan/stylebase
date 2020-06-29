
const parseEnd = (str: string, startFrom: number):number => 
    parseInt(str.substring(startFrom));


export const newId = (prefix: string, conflictZone: string[]) => {
    
    const usedSerials = conflictZone
        .filter(id => id.startsWith(prefix))
        .map(id => parseEnd(id, prefix.length))
        .filter(parseResult => !isNaN(parseResult));
        
    const newSerial = usedSerials.length < 1 ? 1 : Math.max.apply(Math, usedSerials) + 1;

    return prefix + newSerial;
}