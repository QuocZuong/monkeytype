declare module "*.scss" {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content: { [key: string]: any };
    export = content;
}
