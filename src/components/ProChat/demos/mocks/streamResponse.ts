export class MockResponse {
  private controller!: ReadableStreamDefaultController<Uint8Array>;
  private encoder = new TextEncoder();

  private stream: ReadableStream<Uint8Array>;

  constructor(
    private data: string,
    private delay: number = 300,
  ) {
    this.stream = new ReadableStream({
      start: (controller) => {
        this.controller = controller;
        this.pushData();
      },
    });
  }

  private pushData() {
    if (this.data.length === 0) {
      this.controller.close();
      return;
    }

    const chunk = this.data.slice(0, 1);
    this.data = this.data.slice(1);

    this.controller.enqueue(this.encoder.encode(chunk));

    setTimeout(() => this.pushData(), this.delay);
  }

  getResponse() {
    return new Response(this.stream);
  }
}
