const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const amount = 600;

var stars_position = new Array();
var stars_velocity = new Array();
function starsInit(){
    for (let i = 0; i < amount; i++){
        stars_position.push([]);
        stars_velocity.push([]);
    }
    for (let i = 0; i < amount; i++){
        let r1 = rando(0.0,canvas.width);
        let r2 = rando(0.0,canvas.height);
        let r3 = rando(-1.0,1.0,"float");
        let r4 = rando(-1.0,1.0,"float");
        stars_position[i].push(r1,r2);
        stars_velocity[i].push(r3,r4); // stars_position[i][0] - X, stars_position[i][1] - Y

    }
    drawStars();

}

async function starsUpdate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < amount; i++){
        stars_position[i][0] = stars_position[i][0] + stars_velocity[i][0];
        stars_position[i][1] = stars_position[i][1] + stars_velocity[i][1];
        
        if (stars_position[i][1] > canvas.height){stars_position[i][1] = 5;}
        if (stars_position[i][0] > canvas.width){stars_position[i][0] = 5;}
        if (stars_position[i][1] < 0){stars_position[i][1] = canvas.height - 5;}
        if (stars_position[i][0] < 0){stars_position[i][1] = canvas.width - 5;}
    }
    drawStars();
    await new Promise(r => setTimeout(r, 100));
    starsUpdate();
}
function drawStars(){
    resizeCanvas();
    ctx.fillStyle="white";
    ctx.globalAlpha=0.75;
    for (let i = 0; i < amount; i++){
        ctx.fillRect(stars_position[i][0],stars_position[i][1],4,4);
    }
}


function resizeCanvas() {
    var dimension = [document.documentElement.clientWidth, document.body.clientHeight];
    canvas.width = dimension[0];
    canvas.height = dimension[1];
}

window.addEventListener("resize", resizeCanvas);

starsInit();
starsUpdate();
function rando(a, b, e) {
    var g = function(f) {
        return "undefined" === typeof f
    }
      , k = function(f) {
        return "number" === typeof f && !isNaN(f)
    }
      , d = function(f) {
        return !g(f) && null !== f && f.constructor === Array
    }
      , c = function() {
        try {
            for (var f, q = [], r; 30 > (r = "." + q.join("")).length; ) {
                f = (window.crypto || window.msCrypto).getRandomValues(new Uint32Array(5));
                for (var p = 0; p < f.length; p++) {
                    var t = 4E9 > f[p] ? f[p].toString().slice(1) : "";
                    0 < t.length && (q[q.length] = t)
                }
            }
            return Number(r)
        } catch (v) {
            return Math.random()
        }
    };
    try {
        if (null !== a && null !== b && null !== e) {
            if (g(a))
                return c();
            if (window.jQuery && a instanceof jQuery && g(b)) {
                if (0 == a.length)
                    return !1;
                var n = rando(0, a.length - 1);
                return {
                    index: n,
                    value: a.eq(n)
                }
            }
            if (k(a) && k(b) && "string" === typeof e && "float" == e.toLowerCase().trim()) {
                if (a > b) {
                    var m = b;
                    b = a;
                    a = m
                }
                return c() * (b - a) + a
            }
            if (d(a) && 0 < a.length && g(b)) {
                var l = c() * a.length << 0;
                return {
                    index: l,
                    value: a[l]
                }
            }
            if ("object" === typeof a && g(b)) {
                l = a;
                var h = Object.keys(l);
                if (0 < h.length) {
                    var u = h[h.length * c() << 0];
                    return {
                        key: u,
                        value: l[u]
                    }
                }
            }
            if ((!0 === a && !1 === b || !1 === a && !0 === b) && g(e))
                return .5 > rando();
            if (k(a) && g(b))
                return 0 <= a ? rando(0, a) : rando(a, 0);
            if (k(a) && "string" === typeof b && "float" == b.toLowerCase().trim() && g(e))
                return 0 <= a ? rando(0, a, "float") : rando(a, 0, "float");
            if (k(a) && k(b) && g(e))
                return a > b && (m = b,
                b = a,
                a = m),
                a = Math.floor(a),
                b = Math.floor(b),
                Math.floor(c() * (b - a + 1) + a);
            if ("string" === typeof a && 0 < a.length && g(b))
                return a.charAt(rando(0, a.length - 1))
        }
        return !1
    } catch (f) {
        return !1
    }
}
