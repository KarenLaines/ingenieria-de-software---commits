export default class Title {
    public value: string;

    constructor(value: string) {
        this.isValid(value);
        this.value = value;
    }

    private isValid(title: string) {
        if (!title || title.trim().length === 0) {
            throw new Error("Title cannot be empty");
        }
        if (title.length > 100) {
            throw new Error("Title cannot exceed 100 characters");
        }
    }
}
