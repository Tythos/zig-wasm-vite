const std = @import("std");
const name = "zig-wasm-vite";

// define minimal Zig translation layer for Console API
const Console = struct {
    extern "Console" fn log(ptr: ?[*]const u8, len: usize) void;

    fn log_fmt(comptime format: []const u8, args: anytype) void {
        const formatted = std.fmt.allocPrint(std.heap.page_allocator, format, args) catch return;
        defer std.heap.page_allocator.free(formatted);
        Console.log(formatted.ptr, formatted.len);
    }
};

// define enter behavior
export fn enter() void {
    Console.log_fmt("Entering {s} startup...", .{name});
}

// define step behavior
export fn step() void {
    Console.log_fmt("Iterating {s} timestep...", .{name});
}

// define exit behavior
export fn exit() void {
    Console.log_fmt("Exiting {s} shutdown...", .{name});
}
