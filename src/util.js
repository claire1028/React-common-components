export function debounce(func, time) {
  let td;
  return () => {
    clearTimeout(td);
    const ctx = this;
    const args = arguments;
    td = setTimeout(() => {
      func.apply(ctx, args);
    }, time || 80);
  }
}

export function throttle(func, time) {
  let td;
  let last;
  return () => {
    const now = Date.now();
    const ctx = this;
    const args = arguments;
    if(last && now - last < time ) {
      clearTimeout(td);
      td = setTimeout(() => {
        last = now;
        func.apply(ctx, args);
      }, time)
    } else {
      last = now;
      func.apply(ctx, args);
    }
  }
}

export function formatTime(s) {
	let m = Math.floor(s / 60);
	m = m >= 10 ? m : '0' + m;
	s = Math.floor(s % 60);
	s = s >= 10 ? s : '0' + s;
	return m + ':' + s;
}