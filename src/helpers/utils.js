export function getRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

export function shuffle(unshuffled) {
    return unshuffled
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
}
