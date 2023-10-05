class PubSub {
	eventMap = {} as Record<string, Set<(...args: any[]) => void>>;

	constructor() {}

	on(event: string, callback: (...args: any[]) => void) {
		if (!this.eventMap[event]) {
			// create a new set
			this.eventMap[event] = new Set();
		}

		this.eventMap[event].add(callback);
	}

	off(event: string, callback: (...args: any[]) => void) {
		if (!this.eventMap[event]) {
			return;
		}

		this.eventMap[event].delete(callback);
	}

	emit(event: string, ...args: any[]) {
		if (!this.eventMap[event]) {
			return;
		}

		this.eventMap[event].forEach((cb: any) => cb(...args));
	}
}

const pubSub = new PubSub();

export { PubSub, pubSub };
