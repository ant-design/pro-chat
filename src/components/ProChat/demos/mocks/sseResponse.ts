export class MockSSEResponse {
  private controller!: ReadableStreamDefaultController<Uint8Array>;
  private encoder = new TextEncoder();

  private stream: ReadableStream<Uint8Array>;

  constructor(
    private dataArray: string[],
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
    if (this.dataArray.length === 0) {
      this.controller.close();
      return;
    }

    const chunk = this.dataArray.shift();

    this.controller.enqueue(this.encoder.encode(chunk));

    setTimeout(() => this.pushData(), this.delay);
  }

  getResponse() {
    return new Response(this.stream);
  }
}
