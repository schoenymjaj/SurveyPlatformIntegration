export class HttpArgs {
    constructor(
        public protocol: string,
        public authType: string,
        public credentials: string,
        public responseType: string,
        public url: string) { }
}
