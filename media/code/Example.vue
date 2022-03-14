<template>
  <q-page> </q-page>
</template>

<script>
import { defineComponent } from "vue";
import getFheModule from "./../fhe/index";

export default defineComponent({
  name: "Example",
  async mounted() {
    const module = await getFheModule();
    const [publicKey, secretKey] = module.generateKeys();

    const plainText1 = new Uint8Array(10).fill(10);
    const encrypted1 = module.encrypt(plainText1, publicKey);
    const add = new Uint8Array(10).fill(5);
    const result1 = module.addConstantToCipher(encrypted1, add);
    const decryptedResult1 = module.decrypt(result1, secretKey);
    console.log("Decrypted addition: 10 + 5 = 15", decryptedResult1);

    const plainText2 = new Uint8Array(10).fill(10);
    const encrypted2 = module.encrypt(plainText2, publicKey);
    const sub = new Uint8Array(10).fill(7);
    const result2 = module.subtractConstantFromCipher(encrypted2, sub);
    const decryptedResult2 = module.decrypt(result2, secretKey);
    console.log("Decrypted subtraction: 10 - 7 = 3", decryptedResult2);

    const plainText3 = new Uint8Array(10).fill(10);
    const encrypted3 = module.encrypt(plainText3, publicKey);
    const mul = 8;
    const result3 = module.multiplyCipherByConstant(encrypted3, mul);
    const decryptedResult3 = module.decrypt(result3, secretKey);
    console.log("Decrypted multiplication: 10 * 8 = 80", decryptedResult3);

    const plainText4 = new Uint8Array(10).fill(20);
    const encrypted4 = module.encrypt(plainText4, publicKey);
    const div = new Uint8Array(10).fill(2);
    const iteration = 5;
    const result4 = module.divideCipherByConstant(encrypted4, div, iteration);
    const decryptedResult4 = module.decrypt(result4, secretKey);
    console.log("Decrypted division v1: 20 / 2 = 10", decryptedResult4);

    const plainText5 = new Uint8Array(10).fill(20);
    const plainText6 = new Uint8Array(10).fill(27);
    const encrypted5 = module.encrypt(plainText5, publicKey);
    const encrypted6 = module.encrypt(plainText6, publicKey);
    const result5 = module.addCiphers(encrypted5, encrypted6);
    const decryptedResult5 = module.decrypt(result5, secretKey);
    console.log(
      "Decrypted addition of 2 cipher texts v1: 20 + 27 = 47",
      decryptedResult5
    );

    const plainText7 = new Uint8Array(10).fill(78);
    const encrypted7 = module.encrypt(plainText7, publicKey);
    const encrypted8 = module.rerandomize(encrypted7, publicKey);
    const result6 = module.decrypt(encrypted7, secretKey);
    const result7 = module.decrypt(encrypted8, secretKey);
    console.log("Rerandomization example:");
    console.log("Initial encrypted values", encrypted7);
    console.log("Rerandozied encrypted values", encrypted8);
    console.log("Decrypted initial encrypted values", result6);
    console.log("Decrypted rerandomized encrypted values", result7);
  },
});
</script>
