function rFunc2()
{
    return "I'm a require2 function in require3.js";
}


function rFunc3()
{
    var r = "I'm a require3 function, i need rFunc2()\n"
    r += rFunc2();
    return r;
}
