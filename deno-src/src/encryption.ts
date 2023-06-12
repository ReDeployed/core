import { crypto } from "https://deno.land/std@0.184.0/crypto/mod.ts";
import {encode as he} from "https://deno.land/std@0.190.0/encoding/hex.ts";
import {decode as hd} from "https://deno.land/std@0.190.0/encoding/hex.ts";
import { createHash } from "https://deno.land/std@0.119.0/hash/mod.ts";

class Security{ 
	createUUID() {
		const uuid =  crypto.randomUUID();
		return uuid;
	}

	importDBKey(rawKey) {
		const values = Object.values(rawKey.mk);
		const key = Uint8Array.from(values);
		return key
	}

	async createToken(key, passwd) {
		const token = "MeinToken" //await this.createUUID();
		const encryptedToken = await this.encryptAES(key, true, passwd, token)
		console.log("Token: ", token);
		console.log("Enc Token: ", encryptedToken);
		return encryptedToken;
	}

	async hash(algorithm, msg) {
		switch(algorithm) {
			// MD5 Hash
			case "MD5":
				return await createHash("md5").update(msg).toString();

			// SHA256 Hash
			case "SHA256":
				return await createHash("sha256").update(msg).toString();
			
			// SHA512 Hash
			case "SHA512":
				return await createHash("sha512").update(msg).toString();
		}
	}

	async generateKey() {
		const key = await crypto.subtle.generateKey(
			{ name: "AES-CBC", length: 128 },
			true,
			["encrypt", "decrypt"],
		);

		const rawKey = new Uint8Array(await crypto.subtle.exportKey("raw", key));

		return rawKey;
	}

	async importKey(rawKey) {
		const key = await crypto.subtle.importKey(
			"raw",
			rawKey.buffer,
			"AES-CBC",
			true,
			["encrypt", "decrypt"],
		);

		return key;
	}

	async generateIV(key) {
		const encoder = new TextEncoder();
		const md5key = await this.hash("MD5", key);
		const iv = encoder.encode(md5key);
		return iv.subarray(0, 16); 
	}

	async encryptAES(rawKey, dbKey=false, passwd, plain) {
		const textEncoder = (string: string) => new TextEncoder().encode(string);
		const textDecoder = (array: Uint8Array) => new TextDecoder().decode(array);
		
		const iv = await this.generateIV(passwd);
		let key;

		if(dbKey) {
			const parsedKey = await this.importDBKey(rawKey);
			key = await this.importKey(parsedKey);
		} else {
			key = await this.importKey(rawKey);
		}

		const encrypted = await crypto.subtle.encrypt(
			{name: "AES-CBC", iv},
			key,
			textEncoder(plain),
		);

		const encryptedBytes=new Uint8Array(encrypted);
		const hexBytes=textDecoder(he(encryptedBytes));

		return hexBytes;
	}

	async decryptAES(rawKey,dbKey=false, passwd, encrypted) {
		const te = (s:string)=>new TextEncoder().encode(s);
		const td = (d:Uint8Array)=>new TextDecoder().decode(d);
		const iv = await this.generateIV(passwd);
		let key;

		if(dbKey) {
			const parsedKey = await this.importDBKey(rawKey);
			key = await this.importKey(parsedKey);
		} else {
			key = await this.importKey(rawKey);
		}

		const decrypted = await crypto.subtle.decrypt(
			{name: "AES-CBC", iv},
			key,
			hd(te(encrypted)),
		);
		const decryptedBytes = new Uint8Array(decrypted);
		return td(decryptedBytes);
	}
}

export default Security;