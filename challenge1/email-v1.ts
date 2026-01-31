// Email Validator V1
export function validateEmail(email: string): boolean {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}