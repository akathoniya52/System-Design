function task_scheduler(tasks: string[], n: number) {
  let freq: number[] = new Array(26).fill(0);

  for (let task of tasks) {
    freq[task.charCodeAt(0) - 'A'.charCodeAt(0)]++;
  }

  let queue: number[] = [];
  for (let i = 0; i < 26; i++) {
    if (freq[i] > 0) queue.push(freq[i]);
  }

  queue.sort((a, b) => b - a);

  let time = 0;

  while (queue.length !== 0) {
    let temp: number[] = [];
    let cycle = n + 1;

    while (cycle > 0 && queue.length > 0) {
      let current = queue.shift()!;
      if (current > 1) temp.push(current - 1);
      cycle--;
      time++;
    }

    for (let val of temp) queue.push(val);
    queue.sort((a, b) => b - a);

    if (queue.length === 0) break;

    time += cycle; // idle slots
  }

  return time;
}

let tasks = ['A','A','B','B','A','B'];
let n = 1;

console.log(task_scheduler(tasks,n));
