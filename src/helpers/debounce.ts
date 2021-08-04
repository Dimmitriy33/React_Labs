let timeout: ReturnType<typeof setTimeout>;

function debounce(func: () => void, waitTime: number): void {
  clearTimeout(timeout);
  timeout = setTimeout(() => func(), waitTime);
}

export default debounce;
