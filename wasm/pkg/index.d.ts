/* tslint:disable */
/* eslint-disable */
/**
* @returns {Promise<any>}
*/
export function rust_initialize(): Promise<any>;
/**
* @param {string} scheme
*/
export function rust_set_scheme(scheme: string): void;
/**
* @param {number} poly_modulus_degree
* @param {Int32Array} bit_sizes
* @param {number} bit_size
* @param {string} security_level
*/
export function rust_setup_context(poly_modulus_degree: number, bit_sizes: Int32Array, bit_size: number, security_level: string): void;
/**
* @param {string} scheme
* @param {string} security_level
* @param {string} processing_speed
*/
export function rust_fast_setup(scheme: string, security_level: string, processing_speed: string): void;
/**
* @returns {any[]}
*/
export function rust_generate_keys(): any[];
/**
* @param {Int32Array} array
* @param {any} public_key
* @returns {any}
*/
export function rust_encrypt(array: Int32Array, public_key: any): any;
/**
* @param {string} array
* @param {any} secret_key
* @returns {any}
*/
export function rust_decrypt(array: string, secret_key: any): any;
/**
* @param {string} cipher_text1
* @param {string} cipher_text2
* @returns {any}
*/
export function rust_add_ciphers(cipher_text1: string, cipher_text2: string): any;
/**
* @param {string} cipher_text1
* @param {string} cipher_text2
* @returns {any}
*/
export function rust_sub_ciphers(cipher_text1: string, cipher_text2: string): any;
/**
* @param {string} cipher_text1
* @param {string} cipher_text2
* @returns {any}
*/
export function rust_multiply_ciphers(cipher_text1: string, cipher_text2: string): any;
/**
* @param {string} cipher_text1
* @returns {any}
*/
export function rust_square_cipher(cipher_text1: string): any;
/**
* @param {string} cipher_text1
* @param {number} power
* @returns {any}
*/
export function rust_exponentiate_cipher(cipher_text1: string, power: number): any;
/**
* @param {string} cipher_text1
* @returns {any}
*/
export function rust_negate_cipher(cipher_text1: string): any;
/**
* @param {string} cipher_text
* @param {Int32Array} plain_text
* @returns {any}
*/
export function rust_add_plain(cipher_text: string, plain_text: Int32Array): any;
/**
* @param {string} cipher_text
* @param {Int32Array} plain_text
* @returns {any}
*/
export function rust_sub_plain(cipher_text: string, plain_text: Int32Array): any;
/**
* @param {string} cipher_text
* @param {Int32Array} plain_text
* @returns {any}
*/
export function rust_multiply_plain(cipher_text: string, plain_text: Int32Array): any;
/**
*/
export function rust_deallocate_context(): void;
/**
*/
export function rust_deallocate_parameters(): void;
/**
*/
export function rust_deallocate_seal_library(): void;
/**
*/
export function rust_deallocate_module(): void;
