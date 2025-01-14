# zig-wasm-vite

"Live" (HMR) static site development using Vite with Zig-based WASM module as primary application source

Tested with Zig 0.13.0; compile commands for direct WASM build target may be slightly different in other versions.

Uses Vite to automate monitoring and rebuild/reload of WASM binary from Zig source; getting started is a simple two-step:

```sh
yarn install
yarn run dev
```

The only API forwarded to the Zig application in this demonstration is a single `log()` call to Console.

Best "way to use" this as a bootstrapper is most likely through something like `degit`:

```sh
degit https://github.com/Tythos/zig-wasm-vite.git
git init . && git add -A && git commit -m "initial content commit"
```
