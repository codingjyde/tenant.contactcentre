const result = [];

const colours = [
    "red",
    "pink",
    "purple",
    //"deep-purple",
    "indigo",
    "blue",
    //"light-blue",
    "cyan",
    "teal",
    "green",
    //"light-green",
    "lime",
    //"yellow",
    "amber",
    "orange",
    //"deep-orange",
    "brown",
    //"grey",
    //"blue-grey"
];

for (const colour of colours) {
    for (let index = 1; index <= 12; index++) {
        result.push(`${ colour }-${ index }`);
    }
}

export default result;