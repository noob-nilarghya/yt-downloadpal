export function secFormatter(sec)  {  // sec --> hr:min:sec
    const h= Math.floor(sec/(60*60)); sec-=(h*60*60);
    const m= Math.floor(sec/60); sec-=(m*60);

    if(h===0 && m===0) { return `${sec} seconds`; }
    if(h==0) { return `${m} minutes, ${sec} seconds`; }
    return `${h} hours, ${m} minutes, ${sec} seconds`;
}

