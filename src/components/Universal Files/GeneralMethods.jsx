 export default function manualDateFormat(inputDate = ''){
     const date = new Date(inputDate);

  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();

  const hasTime = inputDate.includes('T');

  if (!hasTime) {
    return `${dd}-${mm}-${yyyy}`;
  }

  const hh = String(date.getHours()).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');

  return `${dd}-${mm}-${yyyy} ${hh}:${min}:${ss}`;
}

export function formatFirestoreTimestamp(ts, opts = {}) {
  const date = toDateFromTimestamp(ts);
  if (!date || isNaN(date.getTime())) return null;
  return formatDateTime(date, opts);
}

function toDateFromTimestamp(ts) {
  if (!ts) return null;

  if (typeof ts.toDate === 'function') return ts.toDate();

  if (typeof ts === 'object' && 'seconds' in ts && 'nanoseconds' in ts) {
    const ms = ts.seconds * 1000 + Math.floor(ts.nanoseconds / 1e6);
    return new Date(ms);
  }

  if (typeof ts === 'number') {
    return new Date(ts > 1e12 ? ts : ts * 1000);
  }

  return new Date(ts);
}

function formatDateTime(dateOrMs, { timeZone, includeMs = false } = {}) {
  const date = (dateOrMs instanceof Date) ? dateOrMs : new Date(dateOrMs);

  if (timeZone) {
    const parts = new Intl.DateTimeFormat('en-GB', {
      timeZone,
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false
    }).formatToParts(date);

    const map = {};
    for (const p of parts) {
      if (p.type !== 'literal') map[p.type] = p.value;
    }
    const msPart = includeMs ? '.' + String(date.getMilliseconds()).padStart(3, '0') : '';
    return `${map.year}-${map.month}-${map.day} ${map.hour}:${map.minute}:${map.second}${msPart}`;
  }

  const Y = date.getFullYear();
  const M = String(date.getMonth() + 1).padStart(2, '0');
  const D = String(date.getDate()).padStart(2, '0');
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  const ms = includeMs ? '.' + String(date.getMilliseconds()).padStart(3, '0') : '';
  return `${Y}-${M}-${D} ${hh}:${mm}:${ss}${ms}`;
}