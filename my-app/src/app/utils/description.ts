export default class Description {
    public value: string;

    constructor(value: string) {
        this.isValid(value);
        this.value = value;
    }

    private isValid(description: string) {
        if (!description || description.trim().length === 0) {
            throw new Error("Description cannot be empty");
        }
        if (description.length > 500) {
            throw new Error("Description cannot exceed 500 characters");
        }
    }
}
