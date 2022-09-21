// Juste pour tester Math.random() quand on veux générer un entier de 0 à 100
function test_math_random (inc: number = 1) {

    const tab = Array.apply(null, Array(101)).map(_ => 0);

    for (let i = 0; i < 1000000; i++) {
        let n = ~~(Math.random() * 100);
        tab[n]++;
    }

    for (let i = 0; i <= 100; i += inc)
        console.log(i, ">", ~~(tab[i] / 100));
}

console.log(test_math_random(10));
console.log("\n\n\n---\n");
console.log(test_math_random());
