export default class Author {
    public value: string;

    constructor(value: string) {
        this.isValid(value);
        this.value = value;
    }

    private isValid(author: string) {
        if (!author || author.trim().length === 0) {
            throw new Error("Author cannot be empty");
        }
        if (!/^[a-zA-Z\s]+$/.test(author)) {
            throw new Error("Author name can only contain letters and spaces");
        }
    }
}
