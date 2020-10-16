/**
 * Caesar cipher
 * @class dsad
 * @author Joe Beretta <shakhrukh.97@gmail.com>
 * @copyright Joe Beretta 2020
 *
 * @example
 * import { Caesar } from 'path_to_module/caesar'
 *
 * const cipher = new Caesar();
 * console.log(cipher.encrypt("Hello", 3)); // Jgnnq
 * console.log(cipher.decrypt("Jgnnq", 3)); // Hello
 */
export class Caesar {
	/**
	 * @constant Base dictionary
	 */
	DICT = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
	/**
	 * @constructor
	 * @param {?string} dict - dictionary
	 */
	constructor(dict = '') {
		if (typeof dict === 'string' && dict.length) {
			this.DICT = dict.toUpperCase();
		}
	}

	/**
	 * Returns rotated letter
	 * @private
	 * @param letter
	 * @param rotation
	 */
	private rotate(letter: string, rotation: number): string {
		const letterIndex = this.DICT.indexOf(letter.toUpperCase());

		// Return source letter if not found in dictionary
		if (letterIndex === -1) {
			return letter;
		}

		let rotationIndex = letterIndex + rotation;

		// Normalize rotation index if it's out of bound
		if (rotationIndex >= this.DICT.length) {
			const i = Math.floor(rotationIndex / this.DICT.length);
			rotationIndex -= i * this.DICT.length;
		} else if (rotationIndex < 0) {
			const i = Math.floor(Math.abs(rotationIndex) / this.DICT.length);
			rotationIndex = i || 1 * this.DICT.length + rotationIndex;
		}

		const rotatedLetter = this.DICT.charAt(Math.abs(rotationIndex));

		return letter === letter.toUpperCase()
			? rotatedLetter
			: rotatedLetter.toLowerCase();
	}

	/**
	 * Returns encrypted `text`
	 * @param {string} text to decrypt
	 * @param {number} shift symbols to rotate
	 */
	encrypt(text: string, shift: number): string {
		let result = '';
		for (let i = 0; i < text.length; i++) {
			const letter = text[i];
			result += this.rotate(letter, Math.abs(shift));
		}

		return result;
	}

	/**
	 * Returns decrypted `text`
	 * @param {string} text to decrypt
	 * @param {number} shift symbols to rotate
	 */
	decrypt(text: string, shift: number): string {
		let result = '';
		for (let i = 0; i < text.length; i++) {
			const letter = text[i];
			result += this.rotate(letter, -1 * Math.abs(shift));
		}

		return result;
	}
}
