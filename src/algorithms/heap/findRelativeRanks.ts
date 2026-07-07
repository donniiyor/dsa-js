function findRelativeRanks(scores: number[]): string[] {
    const result: string[] = new Array(scores.length).fill("");
    const maxHeap: Array<{ order: number; score: number }> = [];

    // Fill the heap
    scores.forEach((score, index) => {
        maxHeap.push({ order: index, score });

        // Heapify Up
        if (index !== 0) {
            let currentIndex = maxHeap.length - 1;

            while (currentIndex !== 0) {
                const parentIndex = Math.floor((currentIndex + 1) / 2) - 1;

                if (maxHeap[currentIndex].score > maxHeap[parentIndex].score) {
                    [maxHeap[parentIndex], maxHeap[currentIndex]] = [
                        maxHeap[currentIndex],
                        maxHeap[parentIndex],
                    ];
                    currentIndex = parentIndex;
                } else break;
            }
        }
    });

    // Poll the heap and fill the result
    let index = 0;
    while (maxHeap.length) {
        // Poll
        const firstElement = maxHeap[0];

        maxHeap[0] = maxHeap[maxHeap.length - 1];
        maxHeap.length--;

        // Heapify down
        if (maxHeap.length !== 1) {
            let currentIndex = 0;

            while (true) {
                let largestIndex = currentIndex;

                const lChildIndex = (currentIndex + 1) * 2 - 1;
                const rChildIndex = (currentIndex + 1) * 2;

                if (
                    lChildIndex < maxHeap.length &&
                    maxHeap[largestIndex].score < maxHeap[lChildIndex].score
                ) {
                    largestIndex = lChildIndex;
                }

                if (
                    rChildIndex < maxHeap.length &&
                    maxHeap[largestIndex].score < maxHeap[rChildIndex].score
                ) {
                    largestIndex = rChildIndex;
                }

                if (largestIndex === currentIndex) break;

                [maxHeap[currentIndex], maxHeap[largestIndex]] = [
                    maxHeap[largestIndex],
                    maxHeap[currentIndex],
                ];
                currentIndex = largestIndex;
            }
        }

        if (index === 0) result[firstElement.order] = "Gold Medal";
        else if (index === 1) result[firstElement.order] = "Silver Medal";
        else if (index === 2) result[firstElement.order] = "Bronze Medal";
        else result[firstElement.order] = String(index + 1);

        index++;
    }

    return result;
}

console.log(findRelativeRanks([1, 2, 3, 4, 5]));
