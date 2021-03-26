(function() {

    let lakes = [{ //nested collection of data, array of objects, used to represent a list of lakes objects.
        name: "Caspian Sea",
        fathoms: 560
    }, {
        name: "Tarn Hows",
        fathoms: 53
    }, {
        name: "Crater Lake",
        fathoms: 324
    }, {
        name: "Lake Tanganyika",
        fathoms: 803
    }, {
        name: "Lake Vostok",
        fathoms: 546
    }, {
        name: "Lake Baikal",
        fathoms: 897
    }];
	
    /*
    function return the deepest lake from an array of lakes, based on the lake's deepth
    @param[lakeList]= array of lakes, eachs lake is an object that has [name] and [fathoms] as attributes, must have at least one lake
    @return lake object
    */
    function getDeepestLake(lakeList) {
        let deepestLake = lakes[0];
        if (lakeList.length > 2) { //iterate only if there is a second lake, avoid out of bounds exeception.
            for (let i = 1; i < lakes.length; i++) {
                if (lakeList[i].fathoms > deepestLake.fathoms) {
                    deepestLake = lakeList[i];
                }
            }
        }
        return deepestLake;
    }

    /*
    function converts and returns the fathoms in metres
    @param[fathoms]= a numeric value
    @return a numeric value
    */
    function fathomsInMetres(fathoms) {
        const FATHOM_IN_METRE = 1.8288;
        return fathoms * FATHOM_IN_METRE;
    }

    /*
    function writes to the console the deepest lake and its depth
    */
    function displayLake() {
        let deepestLake = getDeepestLake(lakes);
        let deepthInMetres = fathomsInMetres(deepestLake.fathoms);
        console.log("The deepest lake is: " + deepestLake.name);
        console.log("The lake is: " + deepthInMetres.toFixed(2) + "m depth.");
    }

    window.onload = displayLake; // starts the program, by automatically calling the displayLake() method

})();