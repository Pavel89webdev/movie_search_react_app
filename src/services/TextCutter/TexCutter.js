export default class TextCutter {
	constructor(text) {
		this.text = text;
	}

	cut(maxWordsCount) {
		const { text } = this;
		let newText;

		if (text.length <= maxWordsCount) {
			newText = text;
		}

		if (text.length >= maxWordsCount) {
			const lastWord = text[maxWordsCount];
			if (lastWord === " ") {
				newText = `${text.slice(0, maxWordsCount)} ...`;
			}
			if (lastWord !== " ") {
				const lastSpaceIndex = text.lastIndexOf(" ", maxWordsCount);
				newText = `${text.slice(0, lastSpaceIndex)} ...`;
			}
		}

		return newText;
	}
}
