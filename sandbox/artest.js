var a1 = [[11,12],[11,13],[11,14], [12,13]]
var a2 = [[11,13],[14,11],[12,14]];
a3 = [];
[[a1,a2],[a2,a1]].forEach(a=>{
    a3.push(...a[0].filter(
        ar1 => !a[1].some(
            ar2 => ar1.every(
                n1 => ar2.includes(n1)
            )
        )
    ))
});
console.log("[["+a3.join("], [")+"]]")