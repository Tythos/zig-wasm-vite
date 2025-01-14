/**
 * index.mjs
 */

import wasm_url from "./bin/main.wasm?url";

let memory = null;
let instance = null;
let counter = null;
let steps = 0;
let time = 0;

function getStringFromBuffer(buffer, ptr, len) {
    const bytes =  new Uint8Array(buffer, ptr, len);
    const str = new TextDecoder().decode(bytes);
    return str;
}

function step(timestamp) {
    instance.exports.step();
    steps += 1;
    time = timestamp;
    counter.textContent = `${steps.toFixed(0)} [elapsed frames] / ${time.toFixed(0)} [elapsed milliseconds] = ${(steps / time * 1e3).toFixed(0)} [avg FPS]`;
    window.requestAnimationFrame(step);
}

function onWindowLoad(event) {
    counter = window.document.createElement("div");
    window.document.body.appendChild(counter);

    fetch(wasm_url).then(response =>
        response.arrayBuffer()
    ).then(bytes =>
        WebAssembly.instantiate(bytes,  {
            "Console": {
                "log": (ptr, len) => {
                    const str = getStringFromBuffer(memory.buffer, ptr, len);
                    console.log(str);
                }
            }
        })
    ).then((module) => {
        instance = module.instance;
        memory = instance.exports.memory;
        instance.exports.enter();
        window.requestAnimationFrame(step);
    });
}

window.addEventListener("load", onWindowLoad);
