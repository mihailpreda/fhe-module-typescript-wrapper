import { js_to_rust_initialize, js_to_rust_set_encryption_scheme, js_to_rust_setup_context, js_to_rust_fast_setup, js_to_rust_generate_keys, js_to_rust_encrypt, js_to_rust_decrypt, js_to_rust_add_ciphers, js_to_rust_sub_ciphers, js_to_rust_multiply_ciphers, js_to_rust_square_cipher, js_to_rust_exponentiate_cipher, js_to_rust_negate_cipher, js_to_rust_add_plain, js_to_rust_sub_plain, js_to_rust_multiply_plain } from './snippets/rust-webpack-template-eb3e344350874cf2/js/bindings.js';
import * as wasm from './index_bg.wasm';

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

let WASM_VECTOR_LEN = 0;

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

const lTextEncoder = typeof TextEncoder === 'undefined' ? (0, module.require)('util').TextEncoder : TextEncoder;

let cachedTextEncoder = new lTextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_2.get(state.dtor)(a, state.b);

            } else {
                state.a = a;
            }
        }
    };
    real.original = state;

    return real;
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}
function __wbg_adapter_10(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h4753f528c5b42c3f(arg0, arg1, addHeapObject(arg2));
}

function getArrayI32FromWasm0(ptr, len) {
    return getInt32Memory0().subarray(ptr / 4, ptr / 4 + len);
}

let cachegetUint32Memory0 = null;
function getUint32Memory0() {
    if (cachegetUint32Memory0 === null || cachegetUint32Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory0;
}

function passArrayJsValueToWasm0(array, malloc) {
    const ptr = malloc(array.length * 4);
    const mem = getUint32Memory0();
    for (let i = 0; i < array.length; i++) {
        mem[ptr / 4 + i] = addHeapObject(array[i]);
    }
    WASM_VECTOR_LEN = array.length;
    return ptr;
}
/**
* @returns {Promise<any>}
*/
export function rust_initialize() {
    var ret = wasm.rust_initialize();
    return takeObject(ret);
}

/**
* @param {string} scheme
*/
export function rust_set_scheme(scheme) {
    var ptr0 = passStringToWasm0(scheme, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.rust_set_scheme(ptr0, len0);
}

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4);
    getUint32Memory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
* @param {number} poly_modulus_degree
* @param {Int32Array} bit_sizes
* @param {number} bit_size
* @param {string} security_level
* @param {number} precision
*/
export function rust_setup_context(poly_modulus_degree, bit_sizes, bit_size, security_level, precision) {
    var ptr0 = passArray32ToWasm0(bit_sizes, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passStringToWasm0(security_level, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.rust_setup_context(poly_modulus_degree, ptr0, len0, bit_size, ptr1, len1, precision);
}

/**
* @param {string} scheme
* @param {string} security_level
* @param {string} processing_speed
* @param {number} precision
*/
export function rust_fast_setup(scheme, security_level, processing_speed, precision) {
    var ptr0 = passStringToWasm0(scheme, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passStringToWasm0(security_level, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    var ptr2 = passStringToWasm0(processing_speed, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len2 = WASM_VECTOR_LEN;
    wasm.rust_fast_setup(ptr0, len0, ptr1, len1, ptr2, len2, precision);
}

function getArrayJsValueFromWasm0(ptr, len) {
    const mem = getUint32Memory0();
    const slice = mem.subarray(ptr / 4, ptr / 4 + len);
    const result = [];
    for (let i = 0; i < slice.length; i++) {
        result.push(takeObject(slice[i]));
    }
    return result;
}
/**
* @returns {any[]}
*/
export function rust_generate_keys() {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.rust_generate_keys(retptr);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var v0 = getArrayJsValueFromWasm0(r0, r1).slice();
        wasm.__wbindgen_free(r0, r1 * 4);
        return v0;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

/**
* @param {Int32Array} array
* @param {any} public_key
* @returns {any}
*/
export function rust_encrypt(array, public_key) {
    var ptr0 = passArray32ToWasm0(array, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.rust_encrypt(ptr0, len0, addHeapObject(public_key));
    return takeObject(ret);
}

/**
* @param {string} array
* @param {any} secret_key
* @returns {any}
*/
export function rust_decrypt(array, secret_key) {
    var ptr0 = passStringToWasm0(array, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.rust_decrypt(ptr0, len0, addHeapObject(secret_key));
    return takeObject(ret);
}

/**
* @param {string} cipher_text1
* @param {string} cipher_text2
* @returns {any}
*/
export function rust_add_ciphers(cipher_text1, cipher_text2) {
    var ptr0 = passStringToWasm0(cipher_text1, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passStringToWasm0(cipher_text2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    var ret = wasm.rust_add_ciphers(ptr0, len0, ptr1, len1);
    return takeObject(ret);
}

/**
* @param {string} cipher_text1
* @param {string} cipher_text2
* @returns {any}
*/
export function rust_sub_ciphers(cipher_text1, cipher_text2) {
    var ptr0 = passStringToWasm0(cipher_text1, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passStringToWasm0(cipher_text2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    var ret = wasm.rust_sub_ciphers(ptr0, len0, ptr1, len1);
    return takeObject(ret);
}

/**
* @param {string} cipher_text1
* @param {string} cipher_text2
* @returns {any}
*/
export function rust_multiply_ciphers(cipher_text1, cipher_text2) {
    var ptr0 = passStringToWasm0(cipher_text1, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passStringToWasm0(cipher_text2, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len1 = WASM_VECTOR_LEN;
    var ret = wasm.rust_multiply_ciphers(ptr0, len0, ptr1, len1);
    return takeObject(ret);
}

/**
* @param {string} cipher_text1
* @returns {any}
*/
export function rust_square_cipher(cipher_text1) {
    var ptr0 = passStringToWasm0(cipher_text1, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.rust_square_cipher(ptr0, len0);
    return takeObject(ret);
}

/**
* @param {string} cipher_text1
* @param {number} power
* @returns {any}
*/
export function rust_exponentiate_cipher(cipher_text1, power) {
    var ptr0 = passStringToWasm0(cipher_text1, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.rust_exponentiate_cipher(ptr0, len0, power);
    return takeObject(ret);
}

/**
* @param {string} cipher_text1
* @returns {any}
*/
export function rust_negate_cipher(cipher_text1) {
    var ptr0 = passStringToWasm0(cipher_text1, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ret = wasm.rust_negate_cipher(ptr0, len0);
    return takeObject(ret);
}

/**
* @param {string} cipher_text
* @param {Int32Array} plain_text
* @returns {any}
*/
export function rust_add_plain(cipher_text, plain_text) {
    var ptr0 = passStringToWasm0(cipher_text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray32ToWasm0(plain_text, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    var ret = wasm.rust_add_plain(ptr0, len0, ptr1, len1);
    return takeObject(ret);
}

/**
* @param {string} cipher_text
* @param {Int32Array} plain_text
* @returns {any}
*/
export function rust_sub_plain(cipher_text, plain_text) {
    var ptr0 = passStringToWasm0(cipher_text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray32ToWasm0(plain_text, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    var ret = wasm.rust_sub_plain(ptr0, len0, ptr1, len1);
    return takeObject(ret);
}

/**
* @param {string} cipher_text
* @param {Int32Array} plain_text
* @returns {any}
*/
export function rust_multiply_plain(cipher_text, plain_text) {
    var ptr0 = passStringToWasm0(cipher_text, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray32ToWasm0(plain_text, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    var ret = wasm.rust_multiply_plain(ptr0, len0, ptr1, len1);
    return takeObject(ret);
}

/**
*/
export function rust_deallocate_context() {
    wasm.rust_deallocate_context();
}

/**
*/
export function rust_deallocate_parameters() {
    wasm.rust_deallocate_parameters();
}

/**
*/
export function rust_deallocate_seal() {
    wasm.rust_deallocate_seal();
}

/**
*/
export function rust_deallocate_library() {
    wasm.rust_deallocate_library();
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
function __wbg_adapter_73(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures__invoke2_mut__hb6b1ce70fe4e6087(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}

export function __wbg_new_4beacc9c71572250(arg0, arg1) {
    try {
        var state0 = {a: arg0, b: arg1};
        var cb0 = (arg0, arg1) => {
            const a = state0.a;
            state0.a = 0;
            try {
                return __wbg_adapter_73(a, state0.b, arg0, arg1);
            } finally {
                state0.a = a;
            }
        };
        var ret = new Promise(cb0);
        return addHeapObject(ret);
    } finally {
        state0.a = state0.b = 0;
    }
};

export function __wbg_jstorustsetencryptionscheme_360e0974c2aaa5a0(arg0, arg1) {
    try {
        var ret = js_to_rust_set_encryption_scheme(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    } finally {
        wasm.__wbindgen_free(arg0, arg1);
    }
};

export function __wbindgen_object_drop_ref(arg0) {
    takeObject(arg0);
};

export function __wbg_jstorustsetupcontext_2de46b49c0881787(arg0, arg1, arg2, arg3, arg4, arg5, arg6) {
    try {
        var v0 = getArrayI32FromWasm0(arg1, arg2).slice();
        wasm.__wbindgen_free(arg1, arg2 * 4);
        var ret = js_to_rust_setup_context(arg0, v0, arg3, getStringFromWasm0(arg4, arg5), arg6);
        return addHeapObject(ret);
    } finally {
        wasm.__wbindgen_free(arg4, arg5);
    }
};

export function __wbg_jstorustfastsetup_e7ebbbde93cc7789(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
    try {
        var ret = js_to_rust_fast_setup(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), getStringFromWasm0(arg5, arg6), arg7);
        var ptr0 = passArrayJsValueToWasm0(ret, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len0;
        getInt32Memory0()[arg0 / 4 + 0] = ptr0;
    } finally {
        wasm.__wbindgen_free(arg1, arg2);
        wasm.__wbindgen_free(arg3, arg4);
        wasm.__wbindgen_free(arg5, arg6);
    }
};

export function __wbg_jstorustgeneratekeys_98bfd764e6b75506(arg0) {
    var ret = js_to_rust_generate_keys();
    var ptr0 = passArrayJsValueToWasm0(ret, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export function __wbg_jstorustencrypt_b470b6aa571e43c2(arg0, arg1, arg2) {
    var v0 = getArrayI32FromWasm0(arg0, arg1).slice();
    wasm.__wbindgen_free(arg0, arg1 * 4);
    var ret = js_to_rust_encrypt(v0, takeObject(arg2));
    return addHeapObject(ret);
};

export function __wbg_jstorustdecrypt_b337cdaa5b411ded(arg0, arg1, arg2) {
    try {
        var ret = js_to_rust_decrypt(getStringFromWasm0(arg0, arg1), takeObject(arg2));
        return addHeapObject(ret);
    } finally {
        wasm.__wbindgen_free(arg0, arg1);
    }
};

export function __wbg_jstorustaddciphers_e814452704cd45eb(arg0, arg1, arg2, arg3) {
    try {
        var ret = js_to_rust_add_ciphers(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
        return addHeapObject(ret);
    } finally {
        wasm.__wbindgen_free(arg0, arg1);
        wasm.__wbindgen_free(arg2, arg3);
    }
};

export function __wbg_jstorustsubciphers_eb464c3bb65ea282(arg0, arg1, arg2, arg3) {
    try {
        var ret = js_to_rust_sub_ciphers(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
        return addHeapObject(ret);
    } finally {
        wasm.__wbindgen_free(arg0, arg1);
        wasm.__wbindgen_free(arg2, arg3);
    }
};

export function __wbg_jstorustmultiplyciphers_65e755303b344247(arg0, arg1, arg2, arg3) {
    try {
        var ret = js_to_rust_multiply_ciphers(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
        return addHeapObject(ret);
    } finally {
        wasm.__wbindgen_free(arg0, arg1);
        wasm.__wbindgen_free(arg2, arg3);
    }
};

export function __wbg_jstorustsquarecipher_859129474a84be3d(arg0, arg1) {
    try {
        var ret = js_to_rust_square_cipher(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    } finally {
        wasm.__wbindgen_free(arg0, arg1);
    }
};

export function __wbg_jstorustexponentiatecipher_0df4bf782e8a835c(arg0, arg1, arg2) {
    try {
        var ret = js_to_rust_exponentiate_cipher(getStringFromWasm0(arg0, arg1), arg2);
        return addHeapObject(ret);
    } finally {
        wasm.__wbindgen_free(arg0, arg1);
    }
};

export function __wbg_jstorustnegatecipher_104436fc8fb90f10(arg0, arg1) {
    try {
        var ret = js_to_rust_negate_cipher(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    } finally {
        wasm.__wbindgen_free(arg0, arg1);
    }
};

export function __wbg_jstorustaddplain_367be544767385e6(arg0, arg1, arg2, arg3) {
    try {
        var v0 = getArrayI32FromWasm0(arg2, arg3).slice();
        wasm.__wbindgen_free(arg2, arg3 * 4);
        var ret = js_to_rust_add_plain(getStringFromWasm0(arg0, arg1), v0);
        return addHeapObject(ret);
    } finally {
        wasm.__wbindgen_free(arg0, arg1);
    }
};

export function __wbg_jstorustsubplain_071e11ee489f039b(arg0, arg1, arg2, arg3) {
    try {
        var v0 = getArrayI32FromWasm0(arg2, arg3).slice();
        wasm.__wbindgen_free(arg2, arg3 * 4);
        var ret = js_to_rust_sub_plain(getStringFromWasm0(arg0, arg1), v0);
        return addHeapObject(ret);
    } finally {
        wasm.__wbindgen_free(arg0, arg1);
    }
};

export function __wbg_jstorustmultiplyplain_a6956c68ceb99dc0(arg0, arg1, arg2, arg3) {
    try {
        var v0 = getArrayI32FromWasm0(arg2, arg3).slice();
        wasm.__wbindgen_free(arg2, arg3 * 4);
        var ret = js_to_rust_multiply_plain(getStringFromWasm0(arg0, arg1), v0);
        return addHeapObject(ret);
    } finally {
        wasm.__wbindgen_free(arg0, arg1);
    }
};

export function __wbg_jstorustinitialize_90a373980a3201c9() {
    var ret = js_to_rust_initialize();
    return addHeapObject(ret);
};

export function __wbg_then_58a04e42527f52c6(arg0, arg1, arg2) {
    var ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
};

export function __wbindgen_cb_drop(arg0) {
    const obj = takeObject(arg0).original;
    if (obj.cnt-- == 1) {
        obj.a = 0;
        return true;
    }
    var ret = false;
    return ret;
};

export function __wbg_call_94697a95cb7e239c() { return handleError(function (arg0, arg1, arg2) {
    var ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
    return addHeapObject(ret);
}, arguments) };

export function __wbindgen_debug_string(arg0, arg1) {
    var ret = debugString(getObject(arg1));
    var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

export function __wbg_then_a6860c82b90816ca(arg0, arg1) {
    var ret = getObject(arg0).then(getObject(arg1));
    return addHeapObject(ret);
};

export function __wbg_resolve_4f8f547f26b30b27(arg0) {
    var ret = Promise.resolve(getObject(arg0));
    return addHeapObject(ret);
};

export function __wbindgen_closure_wrapper572(arg0, arg1, arg2) {
    var ret = makeMutClosure(arg0, arg1, 20, __wbg_adapter_10);
    return addHeapObject(ret);
};

