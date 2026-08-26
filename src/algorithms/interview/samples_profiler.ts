interface Sample {
	ts: number;
	stack: string[];
}

interface Event {
	type: "start" | "end";
	ts: number;
	name: string;
}

const s1: Sample = { ts: 7.5, stack: ["main"] };
const s2: Sample = { ts: 9.2, stack: ["main", "my_fn", "my_fn2"] };
const s3: Sample = { ts: 10.7, stack: ["main"] };
const s4: Sample = { ts: 12, stack: [] };
const samples: Sample[] = [s1, s2, s3, s4];

function convertToTrace(samples: Sample[]): Event[] {
	const events: Event[] = [];
	let prevStack: string[] = [];

	function getCommonPrefixL(a: string[], b: string[]): number {
		let i: number = 0;
		while (i < a.length && i < b.length && a[i] === b[i]) i++;
		return i;
	}

	for (const sample of samples) {
		const { ts, stack } = sample;
		const prefixLen: number = getCommonPrefixL(prevStack, stack);

		// Close frames that are no longer present
		for (let i = prevStack.length - 1; i >= prefixLen; i--) {
			events.push({ type: "end", ts, name: prevStack[i] });
		}

		// Open new frames
		for (let i = prefixLen; i < stack.length; i++) {
			events.push({ type: "start", ts, name: stack[i] });
		}

		prevStack = stack;
	}

	// Close any frames still open after the last sample
	const lastTs: number = samples.length > 0 ? samples[samples.length - 1].ts : 0;
	for (let i = prevStack.length - 1; i >= 0; i--) {
		events.push({ type: "end", ts: lastTs, name: prevStack[i] });
	}

	return events;
}

console.log(convertToTrace(samples));
