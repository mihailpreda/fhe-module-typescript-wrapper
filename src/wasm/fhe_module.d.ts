/* tslint:disable */
/* eslint-disable */
/**
* @returns {any[]}
*/
export function generate_keypair(): any[];
/**
* @param {Uint8Array} plain_text
* @param {Uint8Array} public_key
* @returns {Uint8Array}
*/
export function _encrypt(plain_text: Uint8Array, public_key: Uint8Array): Uint8Array;
/**
* @param {Uint8Array} encrypted_text
* @param {Uint8Array} secret_key
* @returns {Uint8Array}
*/
export function _decrypt(encrypted_text: Uint8Array, secret_key: Uint8Array): Uint8Array;
/**
* @param {Uint8Array} encrypted_text
* @param {Uint8Array} constant
* @returns {Uint8Array}
*/
export function add_constant_to_cipher_text(encrypted_text: Uint8Array, constant: Uint8Array): Uint8Array;
/**
* @param {Uint8Array} encrypted_text
* @param {Uint8Array} constant
* @returns {Uint8Array}
*/
export function subtract_constant_from_cipher_text(encrypted_text: Uint8Array, constant: Uint8Array): Uint8Array;
/**
* @param {Uint8Array} encrypted_text_1
* @param {Uint8Array} encrypted_text_2
* @returns {Uint8Array}
*/
export function add_ciphers(encrypted_text_1: Uint8Array, encrypted_text_2: Uint8Array): Uint8Array;
/**
* @param {Uint8Array} encrypted_text
* @param {number} constant
* @returns {Uint8Array}
*/
export function multiply_cipher_by_constant(encrypted_text: Uint8Array, constant: number): Uint8Array;
/**
* @param {Uint8Array} encrypted_text
* @param {Uint8Array} constant
* @param {number} iterations
* @returns {Uint8Array}
*/
export function divide_cipher_by_constant(encrypted_text: Uint8Array, constant: Uint8Array, iterations: number): Uint8Array;
/**
* @param {Uint8Array} encrypted_text
* @param {Uint8Array} public_key
* @returns {Uint8Array}
*/
export function rerandomize(encrypted_text: Uint8Array, public_key: Uint8Array): Uint8Array;
