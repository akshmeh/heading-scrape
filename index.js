import Capitalization  from "./capitalization.js";
import headingScrape from "./headingScrape.js";
import pagesScrape from "./pagesScrape.js";

function mainFunction (){
    pagesScrape("https://tailormade.com/")
    // headingScrape("https://tailormade.com/")
    // Capitalization("this is an example")
}

mainFunction()
