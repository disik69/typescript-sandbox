interface SearchFunction {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunction;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);

    if (result == -1) {
        return false;
    } else {
        return true;
    }
};
