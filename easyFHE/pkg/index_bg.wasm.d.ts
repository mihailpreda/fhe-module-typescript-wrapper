/* tslint:disable */
/* eslint-disable */
export const memory: WebAssembly.Memory;
export function rust_initialize(): number;
export function rust_set_scheme(a: number, b: number): void;
export function rust_setup_context(a: number, b: number, c: number, d: number, e: number, f: number): void;
export function rust_fast_setup(a: number, b: number, c: number, d: number, e: number, f: number): void;
export function rust_generate_keys(a: number): void;
export function rust_encrypt(a: number, b: number, c: number): number;
export function rust_decrypt(a: number, b: number, c: number): number;
export function rust_add_ciphers(a: number, b: number, c: number, d: number): number;
export function rust_sub_ciphers(a: number, b: number, c: number, d: number): number;
export function rust_multiply_ciphers(a: number, b: number, c: number, d: number): number;
export function rust_square_cipher(a: number, b: number): number;
export function rust_exponentiate_cipher(a: number, b: number, c: number): number;
export function rust_negate_cipher(a: number, b: number): number;
export function rust_add_plain(a: number, b: number, c: number, d: number): number;
export function rust_sub_plain(a: number, b: number, c: number, d: number): number;
export function rust_multiply_plain(a: number, b: number, c: number, d: number): number;
export function rust_deallocate_context(): void;
export function rust_deallocate_parameters(): void;
export function rust_deallocate_seal_library(): void;
export function rust_deallocate_module(): void;
export function __wbindgen_malloc(a: number): number;
export function __wbindgen_realloc(a: number, b: number, c: number): number;
export const __wbindgen_export_2: WebAssembly.Table;
export function _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h4753f528c5b42c3f(a: number, b: number, c: number): void;
export function __wbindgen_free(a: number, b: number): void;
export function __wbindgen_add_to_stack_pointer(a: number): number;
export function __wbindgen_exn_store(a: number): void;
export function wasm_bindgen__convert__closures__invoke2_mut__hb6b1ce70fe4e6087(a: number, b: number, c: number, d: number): void;
