import { readFileSync, writeFileSync, existsSync } from 'fs';
import { Caesar } from './caesar';

const INPUT_FILE = 'input.txt';
const OUTPUT_FILE = 'output.txt';

const CRYPT_TYPE = process.argv[2] || '1';
const SHIFT = parseInt(process.argv[3]) || 3;
const DICT = process.argv[4];

const cipher = new Caesar(DICT);

if (!existsSync(INPUT_FILE)) {
	console.log('Файл не найден. Создайте input.txt файл!');
	process.exit(1);
} else {
	const sourceText = readFileSync(INPUT_FILE, { encoding: 'utf8' });
	const cryptedText =
		CRYPT_TYPE == '1'
			? cipher.encrypt(sourceText, SHIFT)
			: cipher.decrypt(sourceText, SHIFT);

	writeFileSync(OUTPUT_FILE, cryptedText, {
		encoding: 'utf8',
	});

	console.log(
		`[1] Тип:\t\t${CRYPT_TYPE == '1' ? '(1) Шифровать' : '(2) Расшифровать'}`
	);
	console.log(`[2] Сдвиг:\t\t${SHIFT}`);
	console.log(`[3] Алфавит:\t\t${cipher.DICT}\n`);
	console.log(`Исходный текст:\t\t${sourceText}`);
	console.log(`Зашифрованный текст:\t${cryptedText}`);
}
